import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import Axios from "../../utils/axiosConfig";


const initialState = {
    candidates: "loading",
}

const resultSlice = createSlice({
      name: 'candidates',
      initialState,
      reducers: {
          setCandidateData: (state, action) => {
              const id = action.payload.id
              state.tasks[id] = action.payload
          }
      },
})