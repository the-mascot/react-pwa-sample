import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userAgent: '',
    deviceType: '',
    isMobile: false,
    showModal: false,
    modalMsg: '',
    showSlideMenu: false,
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
                state.isMobile = true;
            } else {
                state.deviceType = 'Computer';
            }
        },
        modalToggle (state, action) {
            state.modalMsg = action.payload.message;
            state.showModal = action.payload.show;
        },
        slideMenuToggle (state) {
            state.showSlideMenu = !state.showSlideMenu;
        },
    },
});

export const { setUserAgent, setDeviceType, modalToggle, slideMenuToggle, upSlideToggle, setContainerRef } = commonSlice.actions;
export default commonSlice.reducer;
