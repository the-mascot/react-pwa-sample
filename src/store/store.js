import {configureStore} from "@reduxjs/toolkit";
import messageSlice from "../slice/messageSlice";
import commonSlice from "../slice/commonSlice";
import cameraSlice from "../slice/cameraSlice";

export const store = configureStore({
    reducer: {
        common: commonSlice,
        message: messageSlice,
    }
})

export default store;
