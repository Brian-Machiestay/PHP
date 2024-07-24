import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice";
import resultSlice from "./slices/resultSlice";
import alertSlice from "./slices/alertSlice";
import votingSlice from "./slices/votingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
    results: resultSlice,
    alert: alertSlice,
    vote: votingSlice
  },
});

export default store;