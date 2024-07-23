import React from "react";

import brian from "../../assets/images/brian.jpg";

import styles from '../../assets/styles/reusableStyles/volunteerOne.module.scss';


const VolunteerOne = (props) => {
    return (
        <div className={styles.container}>
            <p className={styles.volunteer}><img src={brian} alt="profile" />Alva Johnson</p>
            <p>August 20, 2023</p>
            <p>Data Analyst</p>
            <p data-status="on-going" className={styles.status}>Pending</p>
        </div>
    )
}

export default VolunteerOne;