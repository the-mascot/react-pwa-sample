import {useDispatch, useSelector} from "react-redux";
import {addReceiver, receiverToggle} from "../slice/messageSlice";
import {Modal} from "react-bootstrap";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import {Divider, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";
import {modalToggle} from "../slice/commonSlice";
import AlertModal from "./AlertModal";

const Receiver = () => {
    const dispatch = useDispatch();
    const showReceiver = useSelector(state => state.message.showReceiver);
    const receivers = useSelector(state => state.message.receivers);
    const showModal = useSelector(state => state.common.showModal);

    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [relation, setRelation] = useState("부모");

    const handleSaveClick= () => {
        const hasPhoneNum = receivers.some(receiver => receiver.phoneNum === phoneNum);
        if (hasPhoneNum) {
            return dispatch(modalToggle({ message: '같은 전화번호의 받는사람이 존재합니다.', show: true }));
        } else {
            const receiver = {
                name: name,
                phoneNum: phoneNum,
                relation: relation,
            }
            dispatch(addReceiver({ receiver: receiver }));
            dispatch(receiverToggle());
        }
    }

    const handleRelChange = (event) => {
        setRelation(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handlePhoneNumChange = (event) => {
        setPhoneNum(event.target.value);
    }

    const handleContactClick = () => {
    }

    const handelPhoneChange = (event) => {
        const inputValue = event.target.value;
        const regex = /^\d*$/;

        // 입력된 값이 숫자인지 확인
        if (regex.test(inputValue)) {

        }
    }

    return (
        <Modal show={showReceiver} onHide={() => dispatch(receiverToggle())} centered style={{ padding: "10px" }}>
            <Modal.Body className="px-4">
                <div className="content-between mb-3">
                    <span className="f-b f-16">받는사람</span>
                    <button type="button" className="receiver-add-btn">
                        <ImportContactsIcon color="inherit" fontSize="small" />
                            <span className="f-m">수신인 추가</span>
                    </button>
                </div>
                <Divider variant="fullWidth" component="div" />
                <div className="mt-2 mb-3 f-r">
                    <p className="mt-3 mb-3">이름</p>
                    <TextField
                        required
                        label="필수"
                        value={name}
                        placeholder="이름"
                        className="w-100"
                        onChange={handleNameChange}
                    />
                    <p className="mt-3 mb-2">휴대폰번호</p>
                    <TextField
                        required
                        label="필수"
                        placeholder="숫자만 입력해주세요 ex) 010xxxxxxxx"
                        value={phoneNum}
                        className="w-100"
                        onChange={handlePhoneNumChange}
                    />
                    <p className="mt-3 mb-2">관계</p>
                    <Select
                        value={relation}
                        onChange={handleRelChange}
                        sx={{width: "100%"}}
                    >
                        <MenuItem value={'부모'}>부모</MenuItem>
                        <MenuItem value={"자식"}>자식</MenuItem>
                        <MenuItem value={"가족"}>가족</MenuItem>
                        <MenuItem value={"친구"}>친구</MenuItem>
                        <MenuItem value={"지인"}>지인</MenuItem>
                    </Select>
                </div>
                <Divider component="div" />
                <div className="w-100 content-between">
                    <button type="button" className="receiver-cancel-btn mt-3 me-1" onClick={() => dispatch(receiverToggle())}>취소</button>
                    <button type="submit" className="receiver-save-btn mt-3 ms-1" onClick={handleSaveClick}>저장</button>
                </div>
            </Modal.Body>
            {showModal && <AlertModal />}
        </Modal>
    );
}

export default Receiver;
