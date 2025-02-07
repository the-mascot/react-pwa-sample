import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import {useDispatch} from "react-redux";
import {slideMenuToggle} from "../slice/commonSlice";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const SlideMenu = () => {
    const dispatch = useDispatch();

    return (
        <Box
            sx={{ minWidth: '180px' }}
            role="presentation"
            onClick={() => dispatch(slideMenuToggle())}
            onKeyDown={() => dispatch(slideMenuToggle())}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/"><span className="f-m">Home</span></Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider component="div" />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/message"><span className="f-m">메세지 작성</span></Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider component="div" />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CameraAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/camera"><span className="f-m">찰영하기</span></Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CameraAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/ocr/camera"><span className="f-m">OCR 촬영</span></Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CameraAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/face/camera"><span className="f-m">안면인식 촬영</span></Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CameraAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/record">녹음하기</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CameraAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/media">미디어</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CameraAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/riv">비대면인증 호출 테스트</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default SlideMenu;
