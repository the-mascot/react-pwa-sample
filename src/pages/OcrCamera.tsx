import { useEffect, useRef } from 'react'
import styled from "@emotion/styled";
import styles from "src/assets/css/App.module.css";
import Btn_camera from 'src/assets/img/btn-camera.svg';
import Mask_img from '../assets/img/mask_canvas.svg';
import Mask_bg from '../assets/img/mask_bg.svg';
import Step3a_img from '../assets/img/img-step3a.svg';
import Step3b_img from '../assets/img/img-step3b.svg';
import { CameraModule, FACING_MODE_TYPE } from 'src/scripts/camera';

const BgRoot = styled.div`
	position: relative;
	height: 100%;
	height: 100dvh;
	background-color:rgba(0 0 0 / 0.9);
`;

const P = styled.p`
	margin: 0;
`;

const Maskimg = styled.div`
	position: relative;
	left:0;
	top:0;
	z-index: 1;
	width:100%;
	height:100%;

	&:after {
		content:'';
		position: absolute;
		left:0;
		top:0;
		z-index: 2;
		display:inline-block;
		width:100%;
		height:100%;
		background-color:#fff;
		mask-image: url( ${(Mask_img)} );
		mask-repeat: no-repeat;
		mask-position: center center;
		mask-size: 89.8%;
		aspect-ratio: 1;
		object-fit: cover;
	}
`;

const TextTitle = styled.div`
	position: relative;
	z-index:100;
	font-size: var(--subtitle2-size);
	line-height: 150%;
	font-family: var(--subtitle2-family);
	color: #fff;
	text-align: left;
	display: inline-block;
	max-width: 300px;
	margin: 84px 20px 0;

	@media screen and (max-height: 580px){
		margin: 60px 20px 0;
	}
`;

const CameraVideo = styled.video`
	position: absolute;
	z-index: -1;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	overflow: hidden;
	mask-image: url( ${(Mask_bg)} );
	mask-repeat: no-repeat;
	mask-position: center center;
	mask-size: 100%;
`;

const Item = styled.div`
  position: relative;
  font-size: var(--caption-size);
  line-height: 140%;
  font-family: var(--caption-family);
  color: var(--text-neutral-02);
  text-align: center;
  display: inline-block;
  padding: 0 20px;
  word-break: keep-all;
`;


const CameraInfo = styled.div`
	position: absolute;
	bottom: 102px;
	display: flex;
	padding: 0 20px;
	gap: 4px;
	width: 100%;
    justify-content: center;

		& img {
			display: block;
			margin: 0 auto 8px;
			width: 44px;
		}
	}

	@media (min-height: 500px) and (max-height: 580px){
		bottom: 83px;
		& item {
			line-height: 120%;
			& img {
				margin: 0 auto 0px;
			}
		}
	}
	@media screen and (max-height: 500px){
		bottom: 78px;
		& item {
			line-height: 117%;
			& img {
				margin: 0 auto 0px;
			}
		}
	}
`;

const ButtonCameraIcon = styled.img`
	width: 100%;
	position: absolute;
	left:50%;
	bottom:28px;
	transform: translateX(-50%);
	max-width: 100%;
	overflow: hidden;
	width: 56px;
	height: 56px;
	cursor: pointer;

	@media (min-height: 500px) and (max-height: 580px){
		bottom: 15px;
	}
	@media screen and (max-height: 500px){
		bottom: 10px;
	}
`;

export default function OcrCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      CameraModule.initializeCamera(videoRef.current, FACING_MODE_TYPE.REAR);
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream: MediaStream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    }
  },[])

  return (
    <div className={styles.wrap}>

      <BgRoot>
        <Maskimg>
          <CameraVideo ref={videoRef} autoPlay playsInline />
          <TextTitle>
            <P>표시된 영역에 신분증을 맞춰 배치 후</P>
            <P>하단 버튼을 누르면 촬영됩니다.</P>
          </TextTitle>

          <CameraInfo>
            <Item>
              <img src={Step3a_img} alt='주민등록증 샘플 이미지' />
              어두운 바닥에서 촬영해 주세요
            </Item>
            <Item>
              <img src={Step3b_img} alt='주민등록증 샘플 이미지' />
              빛이 반사되지 않도록 주의해주세요
            </Item>
          </CameraInfo>

          <ButtonCameraIcon src={Btn_camera} alt='Camera Action' />
        </Maskimg>

      </BgRoot>

    </div>
  );
};
