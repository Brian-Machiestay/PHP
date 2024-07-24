import { createSlice, /* createAsyncThunk */ } from "@reduxjs/toolkit";
//import Axios from "../../utils/axiosConfig";

const initialState = {
       vote_data : [],
       voting_details: {},
      nextData: {},
      count: 0,
      finish_voting: false
}

const votingSlice = createSlice({
      name: 'vote',
      initialState,
      reducers: {
            setVotingData: (state, action) => { state.voting_details = action.payload },
            updateVoteData: (state, action) => {
                  console.log(action.payload);
                  console.log('we are updating')
                  state.vote_data.push(action.payload);
            },
            setNextVotingData: (state) => {
                  //console.log('this was called');
                  if (state.count >= state.voting_details["portfolios"].length) return
                  state.nextData = state.voting_details["portfolios"][state.count];
                  state.nextData['last'] = false;
                  if (state.count === state.voting_details["portfolios"].length - 1) state.nextData['last'] = true;
                  state.count += 1
            },
            setFinishVoting: (state) => { state.finish_voting = true }
      }
})

export default votingSlice.reducer;
export const { updateVoteData, setNextVotingData, setFinishVoting, setVotingData } = votingSlice.actions;
