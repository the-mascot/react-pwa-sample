import React from 'react';
import './App.css';
import VisionCamera from "./reoutes/VisionCamera";
import {Route, Routes} from "react-router";
import MediaDevice from "./reoutes/MediaDevice";
import Nav from "./components/Nav";
import NotificationTest from "./reoutes/NotifiactionTest";

function App() {
    return (
    <div className="App">
        <Nav />
        <Routes>
            <Route path="/vision" element={<VisionCamera />} />
            <Route path="/media" element={<MediaDevice />} />
            <Route path="/notification" element={<NotificationTest />} />
        </Routes>
    </div>
    );
}

export default App;
