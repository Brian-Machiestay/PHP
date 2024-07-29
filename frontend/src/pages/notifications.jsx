import React from 'react';
import styles from '../assets/styles/pageStyles/volunteers.module.scss';

import MenuHead from '../components/reusables/menuHead';
import Adminheader from '../components/reusables/adminHeader';
import ComingSoon from '../components/comingSoon';

//import CreateTaskModal from '../components/modals/createTaskModal';


const Notifications = () => {
    return (
        <div className = {styles.container}>
            <MenuHead />
            <Adminheader />
            <ComingSoon />
        </div>
    )
}

export default Notifications;