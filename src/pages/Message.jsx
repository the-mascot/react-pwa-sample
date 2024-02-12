import {useDispatch, useSelector} from "react-redux";
import {postMessage, receiverToggle} from "../slice/messageSlice";
import Receiver from "../components/Receiver";
import ChipBtn from "../components/ChipBtn";

const Message = () => {
    const dispatch = useDispatch();
    const showReceiver = useSelector(state => state.message.showReceiver);
    const receivers = useSelector(state => state.message.receivers);
    useSelector(state => console.log(state));

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('receivers', JSON.stringify(receivers));
        dispatch(postMessage(formData));
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
        dispatch(receiverToggle());
    }

    return (
        <div className="msg-wrap">
            <form id="msgForm" onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="content" className="f-r mt-3">내용 입력</label>
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
                <input type="file" id="attachFiles" name="attachFiles" className="hidden" accept="image/*, audio/*, vedio/*" onChange={handleFileChange} multiple />
                <input type="file" id="imageFile" name="imageFile" className="hidden" accept="image/*" capture="user" onChange={handleFileChange} />
                <input type="file" id="videoFile" name="videoFile"  className="hidden" accept="video/*" capture="user" onChange={handleFileChange} />
                <input type="file" id="voiceFile" name="voiceFile" className="hidden" accept="audio/*" capture="user" onChange={handleFileChange} />
                <div className="content-between my-3">
                    <span className="f-r">받는사람</span>
                    <button type="button" className="receiver-add-btn" onClick={handleReceiverClick}>
                        <span className="receiver-add-span">수신인 추가</span>
                    </button>
                </div>
                { receivers && <ChipBtn /> }
                <div className="content-between mt-5 mb-4">
                    <button type="button" className="msg-temp-save-btn me-1">임시저장</button>
                    <button type="submit" className="msg-save-btn ms-1">저장</button>
                </div>
                {showReceiver && <div className="content-center"><Receiver /></div>}
            </form>
        </div>
    );
}

export default Message;
