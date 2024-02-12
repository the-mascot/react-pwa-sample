import {Fab} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const MobileCallBtn = () => {
    return (
        <a href="tel:1566-6363">
            <Fab color="warning" size="small">
                <LocalPhoneIcon/>
            </Fab>
        </a>
    );
}

export default MobileCallBtn;
