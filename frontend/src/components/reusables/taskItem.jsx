import React from "react";

import styles from "../../assets/styles/reusableStyles/taskItem.module.scss";
//import brian from "../../assets/images/brian.jpg";

import EditTaskModal from "../modals/editTaskModal";

import { unixEpochToDateTime } from "../../utils/dateConversions";

import $ from 'jquery';

const TaskItem = (props) => {

    const openEditTaskModal = () => {
        $(`#editTaskModal-${props.data.id}`).modal('show')
    }
    //console.log(props.data)

    const getRandomColor = () => {
        const cols = [styles.redprofile, styles.greenprofile, styles.blueprofile, styles.movprofile, styles.orangeprofile]
        const randCol = Math.floor(Math.random() * 5);
        return cols[randCol];
    }

    return (
        <>
            <div className={styles.container} id={`${props.data.id}`}>
                <p className={styles.title}>{props.data.title}</p>
                {
                props.data.date_assigned === null? <p className={styles.not_assigned}>Not Assigned</p> : <p> { unixEpochToDateTime(props.data.date_assigned) }</p> 
                }
                <p> { unixEpochToDateTime(props.data.submission_datetime) }</p> 
                {
                props.data.date_assigned === null? <p className={styles.not_assigned}>Not Assigned</p> :
                <p className={styles.volunteer}> { props.data.user?.profile_img === null? <p className={`${styles.no_img} ${getRandomColor()}`}>{props.data.user.name.slice(0, 2).toUpperCase()}</p>:
                    <img src={props.data.user?.profile_img} alt="profile" />} {props.data.user?.name}</p>
                }
                <p data-status="on-going" className={styles.status}>{props.data.status} {props.edit? <button onClick={openEditTaskModal}>Edit Task</button> : false}</p>
            </div>
            <EditTaskModal data={props.data} />
        </>
    )
}

export default TaskItem;