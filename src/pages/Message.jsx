import {useDispatch, useSelector} from "react-redux";
import {postMessage} from "../slice/messageSlice";
import AlertModal from "../components/AlertModal";
import {modalToggle} from "../slice/commonSlice";

const Message = () => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.common.showModal);
    useSelector(state => console.log(state));
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postMessage(e.target));
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        console.log(files);
    }
    const handleCameraClick = () => {
        document.getElementById('imageFile').click();
    }

    const handleVoiceClick = () => {
        document.getElementById('voiceFile').click();
    }

    const handleVideoClick = () => {
        document.getElementById('videoFile').click();
    }

    const handleAttachClick = () => {
        document.getElementById('attachFiles').click();
    }

    const handleReceiverClick = () =>{
        dispatch(modalToggle({ show: true, message: 'Hello' }));
    }

    return (
        <div className="msg-wrap">
            <form id="msgForm" onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="content">메세지 보내기</label>
                    <textarea id="content" className="msg-content mt-2" name="content" rows="5" placeholder="내용을 입력해주세요."/>
                </div>
                <div className="content-center mt-3">
                    <button type="button" className="msg-camera-btn me-1" onClick={handleAttachClick}>
                        <span className="msg-attach-span">첨부하기</span>
                    </button>
                    <button type="button" className="msg-camera-btn ms-1" onClick={handleCameraClick}>
                        <span className="msg-camera-span">사진찍기</span>
                    </button>
                </div>
                <div className="content-center mt-1">
                    <button type="button" className="msg-camera-btn me-1" onClick={handleVideoClick}>
                        <span className="msg-video-span">동영상 찍기</span>
                    </button>
                    <button type="button" className="msg-camera-btn ms-1" onClick={handleVoiceClick}>
                        <span className="msg-voice-span">녹음하기</span>
                    </button>
                </div>
                <input type="file" id="attachFiles" name="attachFiles" className="hidden" accept="image/*, audio/*, vedio/*"  onChange={handleFileChange} multiple />
                <input type="file" id="imageFile" name="imageFile" className="hidden" accept="image/*" onChange={handleFileChange} />
                <input type="file" id="videoFile" name="videoFile"  className="hidden" accept="video/*" onChange={handleFileChange} />
                <input type="file" id="voiceFile" name="voiceFile" className="hidden" accept="audio/*" onChange={handleFileChange} />
                <div className="msg-receiver-wrap mt-3">
                    <div className="content-between">
                        <span>받는사람</span>
                        <button type="button" className="receiver-add-btn" onClick={handleReceiverClick}>
                            <span className="receiver-add-span">수신인 추가</span>
                        </button>
                    </div>
                </div>
                <div className="content-between mt-5 mb-4">
                    <button type="button" className="msg-temp-save-btn me-1">임시저장</button>
                    <button type="submit" className="msg-save-btn ms-1">저장</button>
                </div>
                {showModal && <AlertModal />}
            </form>
        </div>
    );
}

export default Message;
