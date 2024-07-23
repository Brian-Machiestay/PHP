import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/axiosConfig";

//console.log('this code was called at this time');

const initialState = {
    events: "loading",
    eventPosted: {},
    postingEvent: false,
    postingEventError: null
}

export const postEvent = createAsyncThunk(
    'event/postEvent',
    async (data) => {
        const dt = await Axios.post('/admin/events', data);
        return dt['data'];
    }
)

export const getEvents = createAsyncThunk(
    'event/getEvents',
    async (filter) => {
        const dt = await Axios.get(`/events?filter=${filter}`);
        console.log(dt);
        return dt['data'];
    }
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postEvent.pending, (state) => { state.postingEvent = true })
        builder.addCase(postEvent.fulfilled, (state, action) => {
            state.postingEvent = false
            state.eventPosted = action.payload
        })
        builder.addCase(postEvent.rejected, (state, action) => {
            state.postingEvent = false
            state.postingEventError = action.error.message
        })
        builder.addCase(getEvents.fulfilled, (state, action) => {
            //console.log(action)
            state.events = action.payload;
        })
        builder.addCase(getEvents.pending, (state) => {state.events = 'loading'})
        builder.addCase(getEvents.rejected, (state) => {
            state.events = null
        })
    }
})


export default eventSlice.reducer;