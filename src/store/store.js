import {configureStore} from "@reduxjs/toolkit";
import messageSlice from "../slice/messageSlice";

export const store = configureStore({
    reducer: {
        messageSlice
    }
})

export default store;
