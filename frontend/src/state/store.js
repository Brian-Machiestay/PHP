import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice";
import taskSlice from "./slices/taskSlice";
import alertSlice from "./slices/alertSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
    task: taskSlice,
    alert: alertSlice
  },
});

export default store;