import React from "react";
import styles from "../../assets/styles/reusableStyles/taskStatus.module.scss";

import unassigned_img from "../../assets/images/unassigned.svg";
import completed_img from "../../assets/images/completed.svg";
import progress_img from "../../assets/images/progress.svg";

const TaskStatus = (props) => {
    let classNm = styles.unassigned;
    let status_img = unassigned_img;
    const text = props.text;

    if (props.status === 'completed') { 
        classNm = styles.completed;
        status_img = completed_img
    }
    else if (props.status === 'progress') {
        classNm = styles.progress;
        status_img = progress_img
    }
    return (
        <div className={styles.container}>
            <img src={status_img} alt="unassigned tasks" />
            <div className={classNm}>
                <p className={styles.title}>{text}</p>
                <p className={styles.count}>05</p>
            </div>
        </div>
    )
}

export default TaskStatus;