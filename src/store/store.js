import {configureStore} from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import messageSlice from "../slice/messageSlice";

export const store = configureStore({
    reducer: {
        formReducer,
        messageSlice
    }
})

export default store;
