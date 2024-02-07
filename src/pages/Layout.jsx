import Header from "../components/Header";
import Nav from "../components/Nav";
import {Outlet} from "react-router";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <div className="container">
            <Header />
            <Nav />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
