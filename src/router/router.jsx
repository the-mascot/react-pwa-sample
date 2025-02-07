import Home from "../pages/Home";
import {createBrowserRouter} from "react-router-dom";
import Message from "../pages/Message";
import MediaDevice from "../pages/MediaDevice";
import NotificationTest from "../pages/NotifiactionTest";
import Layout from "../pages/Layout";
import AudioRecord from "../pages/AudioRecord";
import OcrCamera from 'src/pages/OcrCamera';
import FaceCamera from 'src/pages/FaceCamera';
import RivAnimationFrameCall from 'src/pages/RivAnimationFrameCall';

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
        path: "/record",
        element: (
          <Layout>
              <AudioRecord />
          </Layout>
        )
    },
    {
        path: "/ocr/camera",
        element: <OcrCamera />
    },
    {
        path: "/face/camera",
        element: <FaceCamera />
    },
    {
        path: "/riv",
        element: <RivAnimationFrameCall />
    }
]);

export default router;

