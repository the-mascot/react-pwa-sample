import {Paper} from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuPaper from "../components/MenuPaper";

const Home = () => {
    return (
        <div className="Home">
            <div className="content-center p-3">
                <Paper className="kv-paper" sx={{ bgcolor: '#f60', borderRadius: 3 }} elevation={4}>
                    <span className="kv-paper-title">전도현</span>
                    <span className="kv-paper-content">님,</span>
                    <p className="kv-paper-content">소중한 분들께</p>
                    <p className="kv-paper-content">남기고 싶은신 말씀을</p>
                    <p className="kv-paper-content">전해드립니다.</p>
                </Paper>
            </div>
            <div className="content-between px-3">
                <MenuPaper svgComponent={<EmailOutlinedIcon fontSize="medium" sx={{ color: 'white' }} />}
                           bgColor="#ffd75de3" menuName="메시지 관리" url="/message" />
                <MenuPaper svgComponent={<GroupAddOutlinedIcon fontSize="medium" sx={{ color: 'white' }} />}
                           bgColor="#198754e3" menuName="수신자 관리" url="/" />
            </div>
            <div className="content-between px-3">
                <MenuPaper svgComponent={<SendOutlinedIcon fontSize="medium" sx={{ color: 'white' }} />}
                           bgColor="#0a58cac2" menuName="메시지 전송 관리" url="/" />
                <MenuPaper svgComponent={<SettingsOutlinedIcon fontSize="medium" sx={{ color: 'white' }} />}
                           bgColor="#c70aca8a" menuName="내정보" url="/" />
            </div>
        </div>
    );
}

export default Home;
