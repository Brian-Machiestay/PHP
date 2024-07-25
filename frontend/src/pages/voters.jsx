import React from 'react';
import styles from '../assets/styles/pageStyles/volunteers.module.scss';

import MenuHead from '../components/reusables/menuHead';
import Adminheader from '../components/reusables/adminHeader';

import VotersList from '../components/votersList';

//import CreateTaskModal from '../components/modals/createTaskModal';


const Volunteers = () => {
    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
            <VotersList />
        </div>
    )
}

export default Volunteers;