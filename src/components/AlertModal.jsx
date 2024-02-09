import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal"
import {modalToggle} from "../slice/commonSlice";

const AlertModal = () => {
    const showModal = useSelector(state => state.common.showModal);
    const modalMsg = useSelector(state => state.common.modalMsg);
    const dispatch = useDispatch();

    const handleClose = (props) => {
        dispatch(modalToggle({show: false}));
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AlertModal;
