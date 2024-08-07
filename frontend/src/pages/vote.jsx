import React from "react";
import styles from '../assets/styles/pageStyles/vote.module.scss';
import vote_img from '../assets/images/Mobile-voting.jpg';
import Candidate from "../components/reusables/candidate";

import { setFinishVoting, setVotingData } from "../state/slices/votingSlice";

import { useSelector, useDispatch } from "react-redux";
import { setNextVotingData } from "../state/slices/votingSlice";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Axios from "../utils/axiosConfig";
import $ from 'jquery';




const Vote = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const [fetching, setFetching] = useState(false);
      const nextPortfolio = useSelector((state) => state.vote.nextData);
      const voting_data = useSelector((state) => state.vote.vote_data);
      const dispatch = useDispatch();
      const finish_voting = useSelector((state) => state.vote.finish_voting);
      //console.log(nextPortfolio);
      console.log(voting_data)
      console.log(searchParams.get('client_id'));

      const startVoting = async () => {
            //setInitial(false);
            //console.log('rendered')
            
            try {
                  const dd = await Axios.get('/14/vote/data');
                  console.log(dd);
                  dispatch(setVotingData(dd['data']));
                  dispatch(setNextVotingData());
            } catch (e) {
                  console.log(e);
            }
      }

      const skipPortfolio = () => {
            if (nextPortfolio['last'] == true) dispatch(setFinishVoting())
            else dispatch(setNextVotingData());
      }

      const buttonForFinishVoting = () => {
            if (finish_voting) return '';
            if (Object.keys(nextPortfolio).length !== 0){
                  return <button onClick={skipPortfolio}>skip</button>
            }
            return <button id='start' onClick={startVoting}>start voting</button>
      }

      if (fetching === true) {
            setFetching(true);
      }

      const castVote = async () => {
            
            try {
                  $('#cast').prop('disabled', true);
                  let data = await Axios.post(`/${searchParams.get('client_id')}/vote?i=${searchParams.get('i')}`, voting_data);
                  $('.voted_info').text('Thankyou for casting your vote');
                  console.log(data);
            } catch (e) {
                  console.log(e);
                  $('.voted_info').text(e['response']['data']);
                  $('#cast').prop('disabled', false);
            }

      }

      let dataToDisplay = 
      <div className={styles.candidatesContainer}>
            <h1>{nextPortfolio["portfolio_name"]}</h1>
                  <div className={styles.candidates}>
                  {
                        nextPortfolio['candidates']?.map((cc) => <Candidate last={nextPortfolio['last']} key={cc['id']} candidate_id={cc['id']} portfolio_id={nextPortfolio['id']} candidate_name={cc['candidate_name']} />)
                  }
                  </div>
      </div>

      if (finish_voting === true) {
            dataToDisplay = <p className='voted_info'>All set. Click on finish to cast your vote</p>
            //console.log('we called this function')
      }


      return(
            <div className={styles.container}>
                  <h1>Payswitch goes to the polls</h1>
                  {
                        Object.keys(nextPortfolio).length === 0? <img src={vote_img} alt="voting" /> : ''
                  }
                  {
                       dataToDisplay
                  }
                  {/*
                        finish_voting || Object.keys(nextPortfolio).length !== 0? <button onClick={skipPortfolio}>next</button> : <button id='start' onClick={startVoting}>start voting</button>
                  */
                 buttonForFinishVoting()
                  }

                  {
                        finish_voting? <button onClick={castVote} id='cast'>Finish</button> : ''
                  }
                  
            </div>
      )
}

export default Vote;