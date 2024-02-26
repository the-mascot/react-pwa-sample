import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const audioRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                const chunks = [];

                mediaRecorder.addEventListener('dataavailable', event => {
                    chunks.push(event.data);
                });

                mediaRecorder.addEventListener('stop', () => {
                    const blob = new Blob(chunks, { type: 'audio/wav' });
                    const url = URL.createObjectURL(blob);
                    setAudioURL(url);
                });

                mediaRecorderRef.current = mediaRecorder;
                setRecording(true);
                mediaRecorder.start();
            })
            .catch(err => console.error('Recording error:', err));
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    const playRecording = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div>
            <h2>Audio Recorder</h2>
            {!recording ? (
                <button onClick={startRecording}>Start Recording</button>
            ) : (
                <button onClick={stopRecording}>Stop Recording</button>
            )}
            <button onClick={playRecording} disabled={!audioURL}>
                Play Recording
            </button>
            {audioURL && <audio src={audioURL} controls ref={audioRef} />}
        </div>
    );
};

export default AudioRecorder;
