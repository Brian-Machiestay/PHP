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

    return (
        <>
            <div className={styles.container} /*id={`${props.data.id}`}*/ >
                <p className={styles.title}>kofi</p>
                <p>mis la</p> 
                <p> mis mi la</p>
            </div>
            {/* <EditTaskModal data={props.data} /> */}
        </>
    )
}

export default TaskItem;