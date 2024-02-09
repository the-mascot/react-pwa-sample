import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showVideo: true,
    stream: null,
    image: '',
}

/*기존 방식과 비교를 위해 redux-toolkit화 하지 않음*/
const cameraSlice = createSlice({
    name: "cameraSlice",
    initialState,
    reducers: {
        setStream (state, action) {
            state.stream = action.payload;
        }
    },
});

export const { setStream, setDeviceType, modalToggle } = cameraSlice.actions;
export default cameraSlice.reducer;
