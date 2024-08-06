import React from "react";

import styles from "../assets/styles/tasks.module.scss";

import time_check from "../assets/images/time-check.svg";
import cal_check from "../assets/images/calendar-check.svg";
import VoterOne from "./reusables/voterOne";
//import {useNavigate} from 'react-router-dom';

import toast from "react-hot-toast";

import VoterModal from "./modals/voterModal";


import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from "react";

import Axios from "../utils/axiosConfig";

import $ from 'jquery';

//import $ from 'jquery';
//let navigate = ''
const VotersList = (props) => {
      const [votersData, setVotersData] = useState([]);
    //console.log('tasks was rendered')
    const openVoterModal = () => {
        $('#createVoterModal').modal('show')
    }

    const sendVotingLink = async () => {
        const toastId = toast.loading('Sending voting link');
        try {
            
            const response = await Axios.get('/sendLink');
            console.log(response['data']);
            toast.success('Link sent successfully', { id: toastId });
        } catch ($e) {
            console.error($e);
            toast.error('Error sending link', { id: toastId });
        }
    }

    useEffect(
       () => {
         getVoters();
         // eslint-disable-next-line 
       }, []
    );
   // navigate = useNavigate();
    const dispatch = useDispatch();
    //const voting_results = useSelector((state) => state.results.results)
    //console.log(voting_results)

    async function getVoters () {
        //console.log('useEffect called me')
        try {
            const data = await Axios.get('/voters');
            console.log(data['data']);
            setVotersData(data['data']);
        } catch (e) {
            console.log(e)
        }
    }

    let dataToDisplay = votersData.map((vt) => <VoterOne voter_id = {vt['voter_id']} key={vt['voter_id']} voter_name = {vt['voter_name']} voter_email = {vt['voter_email']} />) 


    //if (props.button === 'create') butt = <button onClick={openCreateTaskModal}>Create Task</button>

    return (
        <div className={styles.container} id='tasks'>
            <div className={styles.section1}>
                <p>Voters</p>
                
                <button className={`${styles.addCandidate} ${styles.addVoter}`} onClick={openVoterModal}>add Voter</button>
                <button className={`${styles.addCandidate} ${styles.sendLink}`} onClick={sendVotingLink}>Send Link</button>
            </div>
            <div className={styles.other_sections}>
                <div className={styles.section2}>
                    <p>Voter ID</p>
                    <p className={styles.title}><img src={cal_check} alt="candidate name" />Voter Name</p>
                    <p><img src={time_check} alt="portfolio" />Voter email</p>
                </div>
                <div className={styles.section3}>
                {
                    dataToDisplay
                }
                </div>
            </div>
            <VoterModal />
        </div>
    )
}

export default VotersList;