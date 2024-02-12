import Header from "../components/Header";
import {Outlet, useNavigation} from "react-router";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Layout = () => {
    const navigation = useNavigation();

    return (
        <div className="container">
            {navigation.state === "loading" && <Loading />}
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
