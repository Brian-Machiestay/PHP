import React from "react";

import styles from "../assets/styles/tasks.module.scss";

import time_check from "../assets/images/time-check.svg";
import cal_check from "../assets/images/calendar-check.svg";
import ResultItem from "./reusables/resultItem";
//import {useNavigate} from 'react-router-dom';


import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react";

import { getResults } from "../state/slices/resultSlice";

import $ from 'jquery';
//let navigate = ''
const CandidateList = (props) => {
    console.log('tasks was rendered')

    const openPortfolioModal = () => {
        $('#createPortfolioModal').modal('show');
    }

    useEffect(
       () => {
         getCandidateData();
         // eslint-disable-next-line 
       }, []
    );
   // navigate = useNavigate();
    const dispatch = useDispatch();
    const voting_results = useSelector((state) => state.results.results)
    console.log(voting_results)

    function getCandidateData () {
        //console.log('useEffect called me')
        if (voting_results === "") dispatch(getResults());
    }

    let dataToDisplay = <p>Loading</p>
    if (voting_results === null) dataToDisplay = <p>An error occurred</p>
    else dataToDisplay = 
    <>
    {
        voting_results['portfolios']?.map((pp) => {
           return pp['candidates']?.map((cc) => <ResultItem key={cc['id']} portfolio={pp['portfolio_name']} candidate_name = {cc['candidate_name']} candidate_id = {cc['id']} />) 
        })
    }
    </>
    

    //if (props.button === 'create') butt = <button onClick={openCreateTaskModal}>Create Task</button>

    return (
        <div className={styles.container} id='tasks'>
            <div className={styles.section1}>
                <p>Candidates</p>
                <button className={styles.addCandidate}>add candidate</button>
                <button onClick={openPortfolioModal}>add portfolio</button>
            </div>
            <div className={styles.other_sections}>
                <div className={styles.section2}>
                    <p>Candidate ID</p>
                    <p className={styles.title}><img src={cal_check} alt="candidate name" />Candidate Name</p>
                    <p><img src={time_check} alt="portfolio" />portfolio</p>
                </div>
                <div className={styles.section3}>
                {
                    dataToDisplay
                }
                </div>
            </div>
        </div>
    )
}

export default CandidateList;