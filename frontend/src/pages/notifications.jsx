import React from 'react';
import styles from '../assets/styles/pageStyles/volunteers.module.scss';

import MenuHead from '../components/reusables/menuHead';
import Adminheader from '../components/reusables/adminHeader';

//import CreateTaskModal from '../components/modals/createTaskModal';


const Notifications = () => {
    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
            
        </div>
    )
}

export default Notifications;