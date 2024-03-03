import React, {useEffect, useRef} from 'react';

const MediaDevice = () => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const videoFileRef = useRef(null);
    const voiceFileRef = useRef(null);

    useEffect(() => {
        return () => {
            if (videoRef !== null) {
                URL.revokeObjectURL(videoRef); // 컴포넌트가 언마운트될 때 이전에 생성된 Blob URL 해제
            }
        };
    }, [videoRef]);

    const handleVoiceFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (audioRef.current) {
                    audioRef.current.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            if (blobUrl) {
                videoRef.current.src = blobUrl;
            }
        }
    }
    return (
        <div>
            <button type="button" className="msg-camera-btn me-1" onClick={() => videoFileRef.current.click()}>
                <span className="msg-video-span">동영상 찍기</span>
            </button>
            <button type="button" className="msg-camera-btn ms-1" onClick={() => voiceFileRef.current.click()}>
                <span className="msg-voice-span">녹음하기</span>
            </button>
            <input type="file" id="voiceFile" name="voiceFile" className="hidden" accept="audio/*" onChange={handleVoiceFileChange} ref={voiceFileRef} />
            <input type="file" id="videoFile" name="videoFile"  className="hidden" accept="video/*" onChange={handleVideoFileChange} ref={videoFileRef} />
            <audio controls ref={audioRef} />
            <video controls ref={videoRef} style={{ display: 'block', marginTop: '10px', maxHeight: '680px', maxWidth: '360px' }} />
        </div>
    );
};

export default MediaDevice;
