import React, { useEffect, useRef, useState } from 'react';

const MediaDevice = () => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const openCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    mediaRecorderRef.current = new MediaRecorder(stream);

                    // 녹화 중일 때 데이터를 저장할 배열
                    let chunks = [];

                    // 녹화 중일 때 호출되는 이벤트 핸들러
                    mediaRecorderRef.current.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            chunks.push(event.data);
                        }
                    };

                    // 녹화가 중단될 때 호출되는 이벤트 핸들러
                    mediaRecorderRef.current.onstop = () => {
                        const blob = new Blob(chunks, { type: 'video/webm' });
                        chunks = [];

                        // 여기서 blob을 서버로 업로드하거나 다른 작업을 수행할 수 있습니다.
                        console.log('녹화 완료:', blob);
                    };
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        openCamera();

        // Cleanup function to stop the camera and recorder when the component unmounts
        return () => {
            if (videoRef.current) {
                const stream = videoRef.current.srcObject;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                }
            }
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
        };
    }, []);

    const startRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <div>
                {isRecording ? (
                    <button onClick={stopRecording}>녹화 중단</button>
                ) : (
                    <button onClick={startRecording}>녹화 시작</button>
                )}
            </div>
        </div>
    );
};

export default MediaDevice;
