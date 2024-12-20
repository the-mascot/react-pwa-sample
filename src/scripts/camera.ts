import { detectOs, detectOsVersion, OS_TYPE } from 'src/scripts/device';

const LOW_RESOLUTION = [
  //{ width: 1920, height: 1080 }, // FHD
  { width: 1280, height: 720 }, // HD
  { width: 640, height: 480 } // VGA
];

const HIGH_RESOLUTION = [
  //{ width: 7680, height: 4320 }, // 8K
  //{ width: 3840, height: 2048 }, // 4K
  { width: 2560, height: 1440 }, // QHD
  { width: 1920, height: 1080 }, // FHD
  { width: 1280, height: 720 }, // HD
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

let facingMode: string = FACING_MODE_TYPE.REAR;
let resolutionSelector: string = RESOLUTION_TYPE.HIGH;
let resolutionCount: number = 0;
let video: HTMLVideoElement;
let deviceId: string;
const deviceOs = detectOs(navigator.userAgent);
const deviceOsVersion = detectOsVersion(navigator.userAgent, deviceOs);

/*카메라 환경 감지*/
const detectCameraEnv = async () => {
  const constraints: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: { ideal: 'environment' },
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
  } catch (error) {
      console.error('카메라 접근 권한 거부. error: ', error);
      return;
  }

  const deviceList: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices();
  const cameraDevices: MediaDeviceInfo[] = [];

  for (const device of deviceList) {
    console.log('감지 디바이스 정보: ', device);
    if (deviceOs === OS_TYPE.IOS) {
      if (device.kind === 'videoinput' && (device.label === '후면 카메라' || device.label === 'Back Camera')) {
        cameraDevices.push(device);
      }
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

  // 해상도 결정. IOS 15 버전 미만, 안드로이드 11 버전 미만이면 LOW 해상도 사용
  if (deviceOs === OS_TYPE.IOS && deviceOsVersion && deviceOsVersion < 15) {
    resolutionSelector = RESOLUTION_TYPE.LOW;
  } else if (deviceOs === OS_TYPE.ANDROID && deviceOsVersion && deviceOsVersion < 9) {
    resolutionSelector = RESOLUTION_TYPE.LOW;
  }
}

/*카메라 open*/
const openCamera = async () => {
  const width = resolutionSelector === RESOLUTION_TYPE.HIGH ? HIGH_RESOLUTION[resolutionCount].width : LOW_RESOLUTION[resolutionCount].width;
  const height = resolutionSelector === RESOLUTION_TYPE.HIGH ? HIGH_RESOLUTION[resolutionCount].height : LOW_RESOLUTION[resolutionCount].height;
  const constraints: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: { ideal: facingMode },
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

  try {
    // 카메라 open
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // 스트림 시작
    video.srcObject = stream;

    console.log('카메라 getUserMedia 완료');
  } catch (error: any) {
    console.error('카메라 open error: ', error);
    const length = resolutionSelector === RESOLUTION_TYPE.HIGH ? HIGH_RESOLUTION.length : LOW_RESOLUTION.length;

    if (error.name === "OverconstrainedError" && resolutionCount < length) {
      resolutionCount++;
      console.log('resolutionSelector 증가: ', resolutionCount);
      openCamera();
    } else {
      console.error('모든 해상도에서 카메라 오픈 실패.');
    }
  }
};

export const CameraModule = {
  initializeCamera: async (videoRef: HTMLVideoElement, mode: string) => {
    video = videoRef;
    facingMode = mode;
    // 카메라 환경 감지
    await detectCameraEnv();
    // 카메라 오픈
    await openCamera();
  }
}
