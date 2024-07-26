import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../utils/axiosConfig";
import { setCookie } from "../../utils/cookie";


const initialState = {
    count: 0,
    contents: '',
    isLoading: false,
    error: '',
    logout: ''
};

export const login = createAsyncThunk(
  'content/login',
  async (data) => {
    const res = await Axios.post('/auth/login', data)
    const dt = await res.data;
    //console.log('setting the new csrf')
    Axios.defaults.headers.common["X-CSRF-TOKEN"] = await dt['csrf-token'];
    //console.log(Axios.defaults.headers.common["X-CSRF-TOKEN"]);
    //console.log(Axios.defaults.headers.common)
    //console.log(dt);
    return dt;
  }
)

export const logout = createAsyncThunk(
  'content/logout',
  async () => {
    const res = await Axios.get('/auth/logout')
    console.log(res.data)
    return res.data
  }
)

const authSclice = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state, action) => { 
        state.isLoading = true
        state.contents = '' 
      })
      builder.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        setCookie('X-CSRF-TOKEN', action.payload['csrf-token']);
        state.contents = action.payload.data
      })
      builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
        console.log(action.error);
      })
      builder.addCase(logout.fulfilled, (state, action) => {
        state.logout = action.payload
      })
      builder.addCase(logout.rejected, (state, action) => {
        state.logout = null
      })
      builder.addCase(logout.pending, (state, action) => {
        state.logout = ''
      })
    }
  });
  
  //export const { increment } = incSclice.actions;
  export default authSclice.reducer; 