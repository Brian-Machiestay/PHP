import React from "react";
import styles from '../assets/styles/pageStyles/vote.module.scss';
import vote_img from '../assets/images/Mobile-voting.jpg';
import Candidate from "../components/reusables/candidate";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNextVotingData } from "../state/slices/votingSlice";



const Vote = () => {
      //const [initial, setInitial] = useState(true);
      const nextPortfolio = useSelector((state) => state.vote.nextData);
      const dispatch = useDispatch();
      //console.log(nextPortfolio);

      const startVoting = () => {
            //setInitial(false);
            //console.log('rendered')
            dispatch(setNextVotingData());
            
      }


      return(
            <div className={styles.container}>
                  <h1>Payswitch goes to the polls</h1>
                  {
                        Object.keys(nextPortfolio).length == 0? <img src={vote_img} alt="voting" /> : ''
                  }
                  {
                       <div className={styles.candidatesContainer}>
                              <h1>{nextPortfolio["portfolio_name"]}</h1>
                              <div className={styles.candidates}>
                                    {
                                     nextPortfolio['candidates']?.map((cc) => <Candidate key={cc['id']} candidate_id={cc['id']} portfolio_id={nextPortfolio['id']} candidate_name={cc['candidate_name']} />)
                                    }
                              </div>
                        </div>
                  }
                  {
                        Object.keys(nextPortfolio).length != 0? '' : <button onClick={startVoting}>start voting</button>
                  }

                  {
                        Object.keys(nextPortfolio).length != 0 && nextPortfolio['last']? <button>Finish</button> : <button onClick={startVoting}>start voting</button>
                  }
                  
            </div>
      )
}

export default Vote;