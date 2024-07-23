import React from 'react';
import styles from '../assets/styles/pageStyles/volunteers.module.scss';

import Filter from '../components/filter';
import MenuHead from '../components/reusables/menuHead';
import Adminheader from '../components/reusables/adminHeader';
import VolunteerList from '../components/volunterList';

import CreateTaskModal from '../components/modals/createTaskModal';


const Volunteers = () => {
    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
            <h2>Volunteer Search</h2>
            <Filter />
            <VolunteerList />
            <CreateTaskModal />
        </div>
    )
}

export default Volunteers;