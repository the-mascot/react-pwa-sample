import Home from "../pages/Home";
import {createBrowserRouter} from "react-router-dom";
import Message from "../pages/Message";
import MediaDevice from "../pages/MediaDevice";
import NotificationTest from "../pages/NotifiactionTest";
import Layout from "../pages/Layout";
import Camera from "../pages/Camera";
import OcrCamera from 'src/pages/OcrCamera';
import FaceCamera from 'src/pages/FaceCamera';

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <Home />
            </Layout>
        )
    },
    {
        path: "/message",
        element: (
            <Layout>
                <Message />
            </Layout>
    )
    },
    {
        path: "/media",
        element: (
          <Layout>
              <MediaDevice />
          </Layout>
        )
    },
    {
        path: "/notification",
        element: (
          <Layout>
              <NotificationTest />
          </Layout>
        )
    },
    {
        path: "/ocr/camera",
        element: <OcrCamera />
    },
    {
        path: "face/camera",
        element: <FaceCamera />
    }
]);

export default router;

