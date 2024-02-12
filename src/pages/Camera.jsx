import {useEffect, useRef, useState} from "react";
import cameraIcon from "../assets/icon/camera-btn.svg";
import shutter from "../assets/sound/shutter.mp3";
import "../assets/css/camera-style.css"

const Camera = () => {
    const [showVideo, setShowVideo] = useState(true);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const openCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        };
        if (showVideo) {
            openCamera();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [showVideo]);

    const takePicture = () => {
        const canvas = canvasRef.current;
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL("image/png");
        const shutterSound = new Audio(shutter);
        shutterSound.play();
        setShowVideo(false);
    };

    const handleReshootClick = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setShowVideo(true);
    }

    return (
        <div className="camera-wrap">
            {showVideo && stream && <video ref={videoRef} autoPlay className="video" />}
            {showVideo && stream && <img src={cameraIcon} className="shoot-btn" onClick={takePicture} />}
            <canvas ref={canvasRef} className="canvas" />
            {!showVideo &&
                <div className="canvas-btn-wrap content-between">
                    <button className="reshoot-btn" onClick={handleReshootClick}>다시찍기</button>
                    <button className="shoot-ok-btn">확인</button>
                </div>
            }
        </div>
    );
}

export default Camera;
