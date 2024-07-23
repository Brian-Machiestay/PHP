import React from "react";

import styles from "../assets/styles/tasks.module.scss";

import time_check from "../assets/images/time-check.svg";
import cal_check from "../assets/images/calendar-check.svg";
import person from "../assets/images/account-outline.svg";
import list_status from "../assets/images/list-status.svg";
import VolunteerOne from "./reusables/volunteerOne";
import VolunteerDetails from "./volunteerDetails";

const VolunteerList = () => {
    return (
        <div className={`${styles.container} ${styles.details_div}`} id='tasks'>
            <div className={styles.volunteers}>
                <div className={styles.section1}>
                    <p>Task</p>
                </div>
                <div className={styles.other_sections}>
                    <div className={`${styles.section2} ${styles.volunteer}`}>
                        <p className={styles.person}><img src={person} alt="Assigned to" />Volunteer name</p>
                        <p className={styles.title}><img src={cal_check} alt="Task title" />Join Date</p>
                        <p><img src={time_check} alt="Date assigned" />Task Type</p>
                        <p className={styles.status}><img src={list_status} alt="Status" />Status</p>
                    </div>
                    <div className={styles.section3}>
                        <VolunteerOne />
                        <VolunteerOne />
                        <VolunteerOne />
                        <VolunteerOne />
                        <VolunteerOne />
                    </div>
                </div>
            </div>
            <VolunteerDetails />
        </div>
    )
}

export default VolunteerList;