import React from "react";
import styles from "../../assets/styles/reusableStyles/candidateStyle.module.scss";
// import $ from 'jquery';
import { useDispatch } from "react-redux";
import { setNextVotingData, updateVoteData } from "../../state/slices/votingSlice";

const Candidate = (props) => {
      const dispatch = useDispatch();

      const record = (e) => {
            const vote_data = {"portfolio_id": props.portfolio_id, candidate_id: props.candidate_id};
            //console.log($(`#candidate_${props.candidate_id}`));
            dispatch(updateVoteData(vote_data))
            dispatch(setNextVotingData());
            console.log('this was called')
      }

      return (
            <div id={'candidate_' + props.candidate_id} className={styles.container} onClick={record}>
                 <p>{ props.candidate_name }</p>
            </div>
      )
}


export default Candidate;