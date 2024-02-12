import {AppBar, createTheme, Drawer, IconButton, ThemeProvider, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {slideMenuToggle} from "../slice/commonSlice";
import {Link} from "react-router-dom";
import SlideMenu from "./SlideMenu";

const Header = () => {
    const dispatch = useDispatch();
    const showSlide = useSelector(state => state.common.showSlideMenu);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const handleGnbClick = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(slideMenuToggle(!showSlide));
    }

    return (
        <header>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleGnbClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={{ color: 'white' }}><span className="f-b">아름다운 선물</span></Link>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Drawer
                anchor={'left'}
                open={showSlide}
                onClose={handleGnbClick}
            >
                <SlideMenu />
            </Drawer>
        </header>
    );
}

export default Header;
