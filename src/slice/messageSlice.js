import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messageDto: {
        content: '',
        receiver: [],
        imageFile: null,
        videoFile: null,
        voiceFile: null
    }
}

const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {
        saveMessage(state, action) {
            console.log(state);
            console.log(action);
        }
    }
})

export const { saveMessage } = messageSlice.actions;
export default messageSlice.reducer;
