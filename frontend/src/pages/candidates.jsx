import React from 'react';
import styles from '../assets/styles/pageStyles/volunteers.module.scss';

import MenuHead from '../components/reusables/menuHead';
import Adminheader from '../components/reusables/adminHeader';
import CandidateList from '../components/candidateList';

//import CreateTaskModal from '../components/modals/createTaskModal';
import PortfolioModal from '../components/modals/portfolioModal';
import CandidateModal from '../components/modals/candidateModal';


const Candidates = () => {
    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
            <CandidateList />
            <PortfolioModal />
            <CandidateModal />
        </div>
    )
}

export default Candidates;