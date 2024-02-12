import {Paper} from "@mui/material";
import {useNavigate} from "react-router";

const MenuPaper = ({ svgComponent, bgColor, menuName, url }) => {
    const navigate = useNavigate();
    const handlePaperClick = () => {
        navigate(url);
    }

    return (
        <Paper elevation={2} className="menu-paper" onClick={handlePaperClick}>
            <div className="menu-paper-circle mt-3" style={{ backgroundColor: bgColor }}>
                {svgComponent}
            </div>
            <p className="mt-2 f-m">{menuName}</p>
        </Paper>
    );
}

export default MenuPaper;
