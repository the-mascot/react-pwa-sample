import { detectOs, detectOsVersion, OS_TYPE } from 'src/scripts/device';
import { requestAnimationFrame } from 'dom-helpers';

const LOW_RESOLUTION = [
  //{ width: 1920, height: 1080 }, // FHD
  { width: 1280, height: 720 }, // HD
  { width: 640, height: 480 } // VGA
];

const HIGH_RESOLUTION = [
  //{ width: 3840, height: 2048 }, // 4K
  //{ width: 2560, height: 1440 }, // QHD
  { width: 1920, height: 1080 }, // FHD
  { width: 1280, height: 720 }, // HD
  { width: 1024, height: 768 }, // HD (비대면인증)
  { width: 640, height: 480 } // VGA
]

const RESOLUTION_TYPE = {
  HIGH: 'high',
  LOW: 'low'
}

export const FACING_MODE_TYPE = {
  FRONT: 'user',
  REAR: 'environment'
}

export const MIME_TYPE = {
  MP4: 'video/mp4; codecs=avc1',
  WEBM: 'video/webm; codecs=vp8'
}

let facingMode: string = FACING_MODE_TYPE.REAR;
let resolutionSelector: string = RESOLUTION_TYPE.HIGH;
let resolutionCount: number = 0;
let video: HTMLVideoElement; // 화면에 보여지는 비디오 태그
let canvas: HTMLCanvasElement; // 스트림 좌우 반전을 위한 캔버스 태그
let deviceId: string;
let mediaRecorder: MediaRecorder;
let recordedChunks: Blob[] = [];
const deviceOs = detectOs(navigator.userAgent);
const deviceOsVersion = detectOsVersion(navigator.userAgent, deviceOs);

/*카메라 환경 감지*/
const detectCameraEnv = async () => {
  const constraints: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: { ideal: facingMode },
      width: { min: 0 },
      height: { min: 0 },
    }
  }

  // WebRTC 사용 환경 체크
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.error('WebRTC 사용 불가 환경입니다.');
    return;
  }

  try {
    // 카메라 접근 권한 확인
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log('카메라 접근 허용 완료');
    // 스트림 종료
    stream.getTracks().forEach((track) => track.stop());
  } catch (error: any) {
    if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
      // 사용가능한 디바이스 없음.
    } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
      // 디바이스가 이미 사용중이거나 하드웨어 에러
    } else if (error.name === "OverconstrainedError" || error.name === "ConstraintNotSatisfiedError") {
      // 제약조건을 충족하는 다바이스 없음.
    } else if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      // 디바이스 권한 거부 에러
    } else if (error.name === "TypeError" || error.name === "TypeError") {
      // 제약조건이 비어있거나 비디오와 마이크가 모두 false 로 설정될
    } else {
      //other errors
    }
    console.error('카메라 초기화 실패. error: ', error);
    return;
  }

  const deviceList: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices();
  const cameraDevices: MediaDeviceInfo[] = [];

  for (const device of deviceList) {
    console.log('감지 디바이스 정보: ', device);
    if (deviceOs === OS_TYPE.IOS) {
        cameraDevices.push(device);
      // if (device.kind === 'videoinput' && (device.label === '후면 카메라' || device.label === 'Back Camera')) {
      // }
    } else {
      if (device.kind === 'videoinput') cameraDevices.push(device);
    }
  }

  if (cameraDevices.length < 1) {
    console.log('사용 가능한 카메라 디바이스 감지 실패.');
  } else {
    // 사용할 카메라 ID 설정 (카메라 디바이스 중 마지막 카메라 사용)
    deviceId = cameraDevices[cameraDevices.length -1].deviceId;
    console.log('사용 length: ', cameraDevices.length);
    console.log('사용 deviceId: ', deviceId);
  }

  // 해상도 결정. IOS 15 버전 미만, 안드로이드 9 버전 미만이면 LOW 해상도 사용
  if (deviceOs === OS_TYPE.IOS && deviceOsVersion && deviceOsVersion < 15) {
    resolutionSelector = RESOLUTION_TYPE.LOW;
  } else if (deviceOs === OS_TYPE.ANDROID && deviceOsVersion && deviceOsVersion < 9) {
    resolutionSelector = RESOLUTION_TYPE.LOW;
  }
  console.log('resolution type: ', resolutionSelector);
}

/*카메라 open*/
const openCamera = async () => {
  const width = resolutionSelector === RESOLUTION_TYPE.HIGH ? HIGH_RESOLUTION[resolutionCount].width : LOW_RESOLUTION[resolutionCount].width;
  const height = resolutionSelector === RESOLUTION_TYPE.HIGH ? HIGH_RESOLUTION[resolutionCount].height : LOW_RESOLUTION[resolutionCount].height;
  const constraints: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: { exact: facingMode },
      width: { exact: width },
      height: { exact: height },
      frameRate: {
        min: 15, max: 30 // 프레임 최소 15, 최대 30
      },
      deviceId: deviceId
    }
  }

  console.log(`===== [Camera Resolution] =====`
    + `\n width: ${width}`
    + ` x height: ${height}`);

  // ------------------------------- 아이폰 동영상 저장 참고 부분 -------------------------------
  try {
    // 카메라 open
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // 스트림 시작
    video.srcObject = stream;

    // 저장되는 동영상 좌우 반전이 필요할때는 캔버스 스트림사용
    // const canvasStream = createCanvas(width, height);

    const isSupportMp4: boolean = MediaRecorder.isTypeSupported(MIME_TYPE.MP4);
    const isSupportWebm: boolean = MediaRecorder.isTypeSupported(MIME_TYPE.WEBM);
    console.log('video/mp4 지원 여부: ', isSupportMp4);
    console.log('video/webm 지원 여부: ', isSupportWebm);

    // MIME 타입 결정
    const selectedMimeType = selectMimeType(isSupportMp4, isSupportWebm);

    // 미디어 레코드 등록
    mediaRecorder = new MediaRecorder(stream, { mimeType: selectedMimeType });
    // 저장되는 동영상 좌우 반전이 필요할때는 캔버스 스트림사용
    // mediaRecorder = new MediaRecorder(canvasStream, { mimeType: selectedMimeType });

    console.log('mediaRecorder.Type: ', mediaRecorder.mimeType);
    // 미디어 레코드 준비될 떄 이벤트 핸들러
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // 미디어 레코드 끝날 때 이벤트 핸들러
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: selectedMimeType });
      console.log('===== [mediaRecorder.onstop] ===== blob.size: ', blob.size);
      recordedChunks = [];

      // Blob URL 생성
      const url = URL.createObjectURL(blob);

      // 가상의 a 태그 생성
      const a = document.createElement('a');
      a.style.display = 'none'; // 화면에 보이지 않도록 설정
      a.href = url;
      a.download = isSupportMp4 ? 'recorded-video.mp4' : 'recorded-video.webm'; // 다운로드 파일 이름 설정

      // 가상 클릭 이벤트 실행
      document.body.appendChild(a); // DOM에 추가 (필수)
      a.click(); // 클릭 이벤트 트리거
      document.body.removeChild(a); // 클릭 후 DOM에서 제거

      // Blob URL 메모리 해제
      URL.revokeObjectURL(url);
    }
    // ------------------------------- 아이폰 동영상 저장 참고 부분 -------------------------------//
    console.log('카메라 getUserMedia 완료');
  } catch (error: any) {
    console.error('카메라 open error: ', error);
    const length = resolutionSelector === RESOLUTION_TYPE.HIGH ? HIGH_RESOLUTION.length : LOW_RESOLUTION.length;

    if (error.name === "OverconstrainedError" && resolutionCount + 1 < length) {
      resolutionCount++;
      console.log('resolutionSelector 증가: ', resolutionCount);
      openCamera();
    } else {
      console.error('모든 해상도에서 카메라 오픈 실패.');
    }
  }
};

/**
 * MIME 타입 결정 함수
 * 1. 아이폰의 경우 MP4 지원 가능하면 MP4, MP4가 안되고 WEBM 이 가능하면 WEBM
 * 2. 그 외는 WEBM, MP4 순으로 결정
 * 3. 지원 가능 형식이 없으면 '' return
 * @param isSupportMp4, isSupportWebm
 * @return MIME_TYPE
*/
const selectMimeType = (isSupportMp4: boolean, isSupportWebm: boolean): string => {
  if (deviceOs === OS_TYPE.IOS) {
    if (isSupportMp4) {
      return MIME_TYPE.MP4;
    } else if (isSupportWebm) {
      return MIME_TYPE.WEBM;
    }
  } else {
    if (isSupportWebm) {
      return MIME_TYPE.WEBM;
    } else if (isSupportMp4) {
      return MIME_TYPE.MP4;
    }
  }
  throw new Error('===== [selectMimeType] ===== 사용 가능한 MIME 타입 없음.');
}

/**
 * 저장되는 동영상의 좌우 반전이 필요 할 때
 * 캔버스를 이용하여 저장할 수 있도록
 * 캔버스를 만들고 steam 생성하는 함수
 * @param width, height
 * @return MediaStream
 */
const createCanvas = (width: number, height: number): MediaStream => {
  // 좌우 반전 스트림 생성 (Canvas 사용)
  canvas = document.createElement('canvas');
  canvas.width = height;
  canvas.height = width;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas context를 가져올 수 없습니다.');
  }

  /**
   * 비디오 stream 을 바로 저장하면 좌우가 반전되어서 나오기 때문에
   * 비디오를 캔버스에 좌우 번전해서 그린 후, 캔버스 영상을 추출하는 방식
   * */
  const drawCanvas = () => {
    context.save();
    context.scale(-1, 1); // 좌우 반전
    context.translate(-height, 0);
    context.drawImage(video, 0, 0, height, width);
    context.restore();
    requestAnimationFrame(drawCanvas);
  };

  drawCanvas();
  // 캔버스 스트림 가져오기
  return canvas.captureStream();
}

export const CameraModule = {
  initializeCamera: async (videoRef: HTMLVideoElement, mode: string) => {
    video = videoRef;
    facingMode = mode;
    console.log(
      `===== [initializeCamera 실행] =====
        facingMode: ${mode}
        deviceOs: ${deviceOs}
        deviceOsVersion: ${deviceOsVersion}
    `);

    // 카메라 환경 감지
    await detectCameraEnv();
    // 카메라 오픈
    await openCamera();
  },
  takeCamera: () => {
    console.log(mediaRecorder);
    if (mediaRecorder) {
      mediaRecorder.start();
      console.log('==== [Recoding Start] =====');
    }
    console.log(mediaRecorder);
  },
  stopCamera: () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log('==== [Recoding Stop] =====');
    }
  },
  close: () => {
    const videoStream = video.srcObject as MediaStream;
    videoStream.getTracks().forEach((track) => track.stop());
    canvas.captureStream().getTracks().forEach((track) => track.stop());
  }
};


