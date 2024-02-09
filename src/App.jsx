import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setDeviceType, setUserAgent} from "./slice/commonSlice";
import router from "./router/router";
import {RouterProvider} from "react-router";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setUserAgent());
        dispatch(setDeviceType());
    }, []);
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
