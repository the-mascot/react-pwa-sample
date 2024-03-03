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
            sx={{ width: 'auto' }}
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
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/message">메세지 작성</Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CameraAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/camera">찰영하기</Link>
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
        </Box>
    );
}

export default SlideMenu;
