import {useSelector} from "react-redux";
import MobileCallBtn from "./MobileCallBtn";

const Footer = () => {
    const isMobile = useSelector(state => state.common.isMobile);

    return (
        <footer>
            <div className="text-center justify-content-center">
                <p className="f-b f-22 mb-1">한화생명 고객센터</p>
                <p className="f-r f-16">1588-6363</p>
            </div>
            {isMobile && <MobileCallBtn />}
        </footer>
    );
}

export default Footer;
