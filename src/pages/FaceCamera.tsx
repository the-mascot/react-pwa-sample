import React, { useCallback, useEffect, useRef } from 'react'
import styled from "@emotion/styled";
import styles from "src/assets/css/App.module.css";
import { keyframes } from "@emotion/react";
import Face_bg from '../assets/img/face_bg.svg';
import Face_chk_error from '../assets/img/face_chk_error.svg';
import Face_chk_sucess from '../assets/img/face_chk_sucess.svg';
import Check_off from '../assets/img/ico-check-off.svg';
import Check_on from '../assets/img/ico-check-on.svg';
import { CameraModule, FACING_MODE_TYPE } from 'src/scripts/camera';
import Btn_camera from 'src/assets/img/btn-camera.svg';
import { Button } from '@mui/material';

export const arrow1 = keyframes`
    0% { fill: none; }
	20%, 100% { fill: #F5F6F7; }
`;
export const arrow2 = keyframes`
    0% { fill: none; }
	20%, 65% { fill: #F5F6F7; }
`;
export const arrow3 = keyframes`
    0% { fill: none; }
	20%, 40% { fill: #F5F6F7; }
`;

const BgRoot = styled.div`
	position: relative;
	height: 100%;
	height: 100dvh;
	background-color:rgba(0 0 0 / 0.9);
`;

const SubBox = styled.div`
	position: relative;
	height: 100%;
	//height: 100dvh;
	@media (min-width: 660px) and (max-width: 720px) and (min-height: 560px) and (min-aspect-ratio: 1.1/1) {
		width: 55%;
		//margin: 0 auto;
		transform: translate(-50%, 0) rotate(0);
		transform-origin: top center;
		top: 0;
		left: 50%;
		height: 100%;
		//background-color: red;
	}

	@media (min-width: 780px) and (max-width: 850px) and (min-aspect-ratio: 1.1/1) {
		width: 43%;
		transform: translate(-50%, 0) rotate(0);
		transform-origin: top center;
		top: 0;
		left: 50%;
		height: 100%;
		//background-color: yellow;
	}

	@media (min-aspect-ratio: 2/1) and (orientation: landscape) {
		transform: rotate(-90deg);
		transform-origin: top left;
		position: absolute;
		top: 100%;
		left: 0;
		width: 100dvh;
		height: 100dvw;
		//background-color: blue;
	}
`;
const TextTitle = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	text-align: left;
	font-size: var(--title2-size);
	color: var(--text-inverse);
	font-family: var(--title2- family);
	padding:32px 20px 0;

	@media screen and (max-height: 580px) {
		padding:22px 20px 0;
	}
`;

const Maskimg = styled.div`
	position: relative;
	left:0;
	top:0;
	z-index: 1;
	width:100%;
	height:100%;
`;

type DivType = {
  width: number,
  height: number
}

const FaceArrow = styled.div<DivType>`
	display: flex;
	width: 100%;
	height: 100%;
	position: absolute;

	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 66px;
		height: 53px;
		transform: translate(-50%, -${props => `${props.width / 2 + 51}px`});

		@media (min-height: 500px) and (max-height: 580px){
			width: 56px;
			height: 43px;
			transform: translate(-50%, -${props => `${props.width / 2 + 45}px`});
		}
		@media screen and (max-height: 500px){
			width: 46px;
			height: 33px;
			transform: translate(-50%, -${props => `${props.width / 2 + 25}px`});
		}
		@media (min-width: 660px) and (max-width: 720px) and (min-height: 560px) and (min-aspect-ratio: 1.1/1) {
			transform: translate(-50%, -${props => `${(props.width * 0.55) / 2 + 45}px`});
		}
		@media (min-width: 780px) and (max-width: 850px) and (min-aspect-ratio: 1.1/1) {
			transform: translate(-50%, -${props => `${(props.width * 0.45) / 2 + 31}px`});
		}
		@media (min-aspect-ratio: 2/1) and (orientation: landscape) {
			transform: translate(-50%, -${props => `${props.height / 2 + 51}px`});
		}
	}

	.FaceArrowNone {
		display: none;
	}

	.FaceArrowLeft,
	.FaceArrowRight {
		#arrow1 {
			animation-name: ${arrow1};
			animation-duration: 1.5s;
			animation-delay: -0.1s;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
		}
		#arrow2 {
			animation-name: ${arrow2};
			animation-duration: 1.5s;
			animation-delay: 0.15s;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
		}
		#arrow3 {
			animation-name: ${arrow3};
			animation-duration: 1.5s;
			animation-delay: 0.35s;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
		}
	}

	.FaceArrowRight {
		transform: translate(-50%, -${props => `${props.width / 2 + 51}px`}) rotate(180deg);
		@media (min-height: 500px) and (max-height: 580px){
			transform: translate(-50%, -${props => `${props.width / 2 + 45}px`}) rotate(180deg);
		}
		@media screen and (max-height: 500px){
			transform: translate(-50%, -${props => `${props.width / 2 + 25}px`}) rotate(180deg);
		}
		@media (min-width: 660px) and (max-width: 720px) and (min-height: 560px) and (min-aspect-ratio: 1.1/1) {
			transform: translate(-50%, -${props => `${(props.width * 0.55) / 2 + 41}px`}) rotate(180deg);
		}
		@media (min-width: 780px) and (max-width: 850px) and (min-aspect-ratio: 1.1/1) {
			transform: translate(-50%, -${props => `${(props.width * 0.45) / 2 + 31}px`}) rotate(180deg);
		}
		@media (min-aspect-ratio: 2/1) and (orientation: landscape) {
			transform: translate(-50%, -${props => `${props.height / 2 + 51}px`}) rotate(180deg);
		}
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
	mask-image: url( ${(Face_bg)} );
	mask-repeat: no-repeat;
	mask-position: center center;
	mask-size: 100%;
	transform: rotateY(180deg);
	-webkit-transform: rotateY(180deg);
	-moz-transform: rotateY(180deg);
`;

const FaceChkError = styled.div`
	position: absolute;
	z-index: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	overflow: hidden;
	background-image: url( ${(Face_chk_error)} );
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 100%;
`;

const FaceChkSucess = styled.div`
	position: absolute;
	z-index: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	overflow: hidden;
	background-image: url( ${(Face_chk_sucess)} );
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 100%;
`;

const CheckList = styled.ul<DivType>`
	position: absolute;
	right: 20px;
	top: 50%;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 8px;
	transform: translateY( ${props => `${(props.width - 40) / 2 - 72}px`});

	li {
		display: inline-block;
		font-size: 0;
		span{
			display: inline-block;
			width: 16px;
			height: 16px;
			background-image: url( ${(Check_off)} );
			background-repeat: no-repeat;
			background-position: center center;

			&.on {
				background-image: url( ${(Check_on)} );
			}
		}
	}
	/*
	@media screen and (max-height: 580px){
		transform: translateY( ${props => `${props.width / 2 - 80}px`});
	}
	@media (min-width: 660px) and (max-width: 720px) and (min-height: 560px) and (min-aspect-ratio: 1.1/1) {
		transform: translateY( ${props => `${(props.width * 0.55) / 2 - 90}px`});
	}
	@media (min-width: 780px) and (max-width: 850px) and (min-aspect-ratio: 1.1/1) {
		transform: translateY( ${props => `${(props.width * 0.45) / 2 - 100}px`});
	}
	@media (min-aspect-ratio: 2/1) and (orientation: landscape) {
		transform: translateY( ${props => `${props.height / 2 - 80}px`});
	}
	*/
`;

const Textinfo = styled.div<DivType>`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 100%;
	padding: 0 20px;
	font-size: var(--subtitle1-size);
	line-height: 150%;
	font-family: var(--body1-family);
	color: var(--system-white);
	text-align: center;
	display: inline-block;
	transform: translate(-50%, ${props => `${props.width / 2}px`});
	@media (min-width: 660px) and (max-width: 720px) and (min-height: 560px) and (min-aspect-ratio: 1.1/1) {
		transform: translate(-50%, ${props => `${(props.width * 0.55) / 2}px`});
	}
	@media (min-width: 780px) and (max-width: 850px) and (min-aspect-ratio: 1.1/1) {
		transform: translate(-50%, ${props => `${(props.width * 0.45) / 2}px`});
		line-height: 115%;
	}
	@media (min-aspect-ratio: 2/1) and (orientation: landscape) {
		transform: translate(-50%, ${props => `${props.height / 2}px`});
		line-height: 140%;
	}
`;

const ButtonCameraIcon = styled.img`
  z-index: 99999;
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

export default function FaceCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      CameraModule.initializeCamera(videoRef.current, FACING_MODE_TYPE.FRONT);
    }

    return () => {
      CameraModule.close();
    }
  },[])

  const handleTakeCamera = useCallback(() => {
    console.log('===== [handleTakeCamera 동작] =====');
    CameraModule.takeCamera();
  }, []);

  const handleStopCamera = useCallback(() => {
    console.log('===== [handleStopCamera 동작] =====');
    CameraModule.stopCamera();
  }, []);

  return (
    <div className={styles.wrap}>

      <BgRoot>
        <SubBox>
          <Maskimg>
            <FaceChkSucess />
            <CameraVideo ref={videoRef} playsInline autoPlay />
            <FaceArrow width={window.innerWidth} height={window.innerHeight}>
              <svg className="FaceArrowLeft" width="66" height="64" viewBox="0 0 66 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="arrow1" fill-rule="evenodd" clip-rule="evenodd" d="M65.699 6.28486C66.0939 6.67089 66.1012 7.30402 65.7151 7.69898L42.3747 31.5792C42.3746 31.5793 42.3745 31.5794 42.3744 31.5795C42.1352 31.8255 42 32.1577 42 32.5044C42 32.8516 42.1352 33.1837 42.3742 33.4296C42.3743 33.4297 42.3745 33.4299 42.3747 33.4301L65.715 57.3009C66.1011 57.6958 66.094 58.3289 65.6991 58.715C65.3042 59.1011 64.6711 59.094 64.285 58.6991L40.943 34.8266L40.9414 34.8249C40.3371 34.2041 40 33.3707 40 32.5044C40 31.6385 40.3372 30.8051 40.9414 30.1843L40.9429 30.1828L64.2849 6.30102C64.6709 5.90606 65.304 5.89882 65.699 6.28486Z" />
                <path id="arrow2" fill-rule="evenodd" clip-rule="evenodd" d="M45.699 6.28486C46.0939 6.67089 46.1012 7.30402 45.7151 7.69898L22.3747 31.5792C22.3746 31.5793 22.3745 31.5794 22.3744 31.5795C22.1352 31.8255 22 32.1577 22 32.5044C22 32.8516 22.1352 33.1837 22.3742 33.4296C22.3743 33.4297 22.3745 33.4299 22.3747 33.4301L45.715 57.3009C46.1011 57.6958 46.094 58.3289 45.6991 58.715C45.3042 59.1011 44.6711 59.094 44.285 58.6991L20.943 34.8266L20.9414 34.8249C20.3371 34.2041 20 33.3707 20 32.5044C20 31.6385 20.3372 30.8051 20.9414 30.1843L20.9429 30.1828L44.2849 6.30102C44.6709 5.90606 45.304 5.89882 45.699 6.28486Z" />
                <path id="arrow3" fill-rule="evenodd" clip-rule="evenodd" d="M25.699 6.28486C26.0939 6.67089 26.1012 7.30402 25.7151 7.69898L2.37467 31.5792C2.37457 31.5793 2.37447 31.5794 2.37438 31.5795C2.13516 31.8255 2 32.1577 2 32.5044C2 32.8516 2.13515 33.1837 2.37416 33.4296C2.37433 33.4297 2.3745 33.4299 2.37467 33.4301L25.715 57.3009C26.1011 57.6958 26.094 58.3289 25.6991 58.715C25.3042 59.1011 24.6711 59.094 24.285 58.6991L0.943013 34.8266L0.941373 34.8249C0.337121 34.2041 7.10939e-07 33.3707 7.48805e-07 32.5044C7.86654e-07 31.6385 0.337197 30.8051 0.941373 30.1843L0.942878 30.1828L24.2849 6.30102C24.6709 5.90606 25.304 5.89882 25.699 6.28486Z"  />
              </svg>
            </FaceArrow>

            <CheckList width={window.innerWidth} height={window.innerHeight}>
              <li><span className="on"></span></li>
              <li><span className="off"></span></li>
              <li><span className="off"></span></li>
            </CheckList>

            <TextTitle>왼쪽 얼굴 촬영</TextTitle>

            <Button style={{ zIndex: 99999 }} onClick={handleStopCamera}>정지</Button>
            <Textinfo width={window.innerWidth} height={window.innerHeight}>
              원활한 촬영을 위해 초록색을 유지해 주시고, 빨간색은 얼굴 촬영이 진행되지 않으니 유의해 주세요.
            </Textinfo>
          </Maskimg>
        </SubBox>
      </BgRoot>
      <ButtonCameraIcon src={Btn_camera} alt='Camera Action' onClick={handleTakeCamera} />
    </div>
  );
};
