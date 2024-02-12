import {Chip, Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteReceiver} from "../slice/messageSlice";

const ChipBtn = () => {
    const dispatch = useDispatch();
    const receivers = useSelector(state => state.message.receivers);
    const handleDelete = (targetNum) => {
        const newReceiver = receivers.filter(receiver => receiver.phoneNum !== targetNum);
        dispatch(deleteReceiver(newReceiver));
    }

    return (
        <>
            <Divider component="div" className="mb-3" />
            {receivers.map(receiver => (
                <Chip
                    key={receiver.phoneNum}
                    label={`${receiver.name}(${receiver.relation})`}
                    variant="outlined"
                    onDelete={() => handleDelete(receiver.phoneNum)}
                    size="medium"
                    style={{ fontFamily: "Noto Sans KR Medium", marginRight: "8px", marginBottom: "8px" }}
                />
            ))}
        </>
    );
}

export default ChipBtn;
