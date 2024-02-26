import Home from "../pages/Home";
import {createBrowserRouter} from "react-router-dom";
import Message from "../pages/Message";
import MediaDevice from "../pages/MediaDevice";
import NotificationTest from "../pages/NotifiactionTest";
import Layout from "../pages/Layout";
import Camera from "../pages/Camera";
import AudioRecord from "../pages/AudioRecord";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/message",
                element: <Message />
            },
            {
                path: "/media",
                element: <MediaDevice />
            },
            {
                path: "/notification",
                element: <NotificationTest />
            },
            {
                path: "/record",
                element: <AudioRecord />
            }
        ]
    },
    {
        path: "/camera",
        element: <Camera />
    },
]);

export default router;

