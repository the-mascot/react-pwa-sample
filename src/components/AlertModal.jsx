import {useDispatch, useSelector} from "react-redux";
import {modalToggle} from "../slice/commonSlice";
import {Box, Button, Modal} from "@mui/material";

const AlertModal = () => {
    const showModal = useSelector(state => state.common.showModal);
    const modalMsg = useSelector(state => state.common.modalMsg);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalToggle({show: false}));
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75%',
        bgcolor: 'background.paper',
        border: '0',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
                open={showModal}
                onClose={handleClose}>
                <Box sx={style}>
                    <p className="f-m f-18">{modalMsg}</p>
                    <div className="content-center">
                        <Button
                            className="w-100 mt-3"
                            variant="contained"
                            color="error"
                            onClick={handleClose}
                        >
                                <span className="f-m f-18">확&nbsp;인</span>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default AlertModal;
