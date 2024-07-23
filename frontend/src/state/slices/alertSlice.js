import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertmsg: ''
};

const alertSclice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlertMsg: (state, action) => {
            console.log(action.payload)
            state.alertmsg = action.payload
        }
    }
})

export const { setAlertMsg } = alertSclice.actions;
export default alertSclice.reducer;