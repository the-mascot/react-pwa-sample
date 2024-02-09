import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userAgent: '',
    deviceType: '',
    showModal: false,
    modalMsg: ''
}

const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {
        setUserAgent (state, action) {
            state.userAgent = window.navigator.userAgent;
        },
        setDeviceType (state) {
            if (state.userAgent.includes('Mobi') || state.userAgent.includes('Android') ||
                state.userAgent.includes('iPhone') || state.userAgent.includes('iPad') || state.userAgent.includes('iPod')) {
                state.deviceType = 'Mobile';
            } else {
                state.deviceType = 'Computer';
            }
        },
        modalToggle (state, action) {
            state.modalMsg = action.payload.message;
            state.showModal = action.payload.show;
        }
    },
});

export const { setUserAgent, setDeviceType, modalToggle } = commonSlice.actions;
export default commonSlice.reducer;
