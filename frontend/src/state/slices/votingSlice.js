import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/axiosConfig";

const initialState = {
       vote_data : [],
       voting_details: {
            "client_id": 1,
            "client_name": "vecluas de ramis",
            "portfolios": [
            {
                    "id": 1,
                    "portfolio_name": "president",
                    "candidates": [
                        {
                            "id": 16,
                            "candidate_name": "Monte ne Gro santiago"
                        },
                        {
                            "id": 17,
                            "candidate_name": "Santenera Vidya"
                        }
                  ]
            },
            {
                    "id": 2,
                    "portfolio_name": "vice president",
                    "candidates": [
                    {
                        "id": 12,
                        "candidate_name": "Maica Nawaa"
                  },
                  {
                        "id": 13,
                        "candidate_name": "Lemone Ganster"
                  }
                  ]
            }
            ]
      },
      nextData: {},
      count: 0
}

const votingSlice = createSlice({
      name: 'vote',
      initialState,
      reducers: {
            updateVoteData: (state, action) => { 
                  state.vote_data.push(action.payload);
            },
            setNextVotingData: (state) => {
                  //console.log('this was called');
                  if (state.count >= state.voting_details["portfolios"].length) return
                  state.nextData = state.voting_details["portfolios"][state.count];
                  state.nextData['last'] = false;
                  if (state.count == state.voting_details["portfolios"].length - 1) state.nextData['last'] = true;
                  state.count += 1
            }
      }
})
export default votingSlice.reducer;
export const {updateVoteData, setNextVotingData} = votingSlice.actions;
