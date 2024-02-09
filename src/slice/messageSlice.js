import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: '',
    success: false,
    error: null,
}

export const postMessage = createAsyncThunk(
    '/post/message',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8010/message", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postMessage.pending, (state) => {
            console.log('pending');
            state.loading = 'pending';
        });
        builder.addCase(postMessage.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            console.log('fulfilled');
            console.log(action.payload);
        });
        builder.addCase(postMessage.rejected, (state, action) => {
            console.log('error');
            state.loading = 'failed';
            state.error = action.payload;
        });
    }
});

export default messageSlice.reducer;
