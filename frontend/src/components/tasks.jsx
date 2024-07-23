import React from "react";

import styles from "../assets/styles/tasks.module.scss";

import time_check from "../assets/images/time-check.svg";
import cal_check from "../assets/images/calendar-check.svg";
import person from "../assets/images/account-outline.svg";
import list_status from "../assets/images/list-status.svg";
import TaskItem from "./reusables/taskItem";
import {useNavigate} from 'react-router-dom';


import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react";

import { getTasks } from "../state/slices/taskSlice";

import $ from 'jquery';
let navigate = ''
const Tasks = (props) => {
    console.log('tasks was rendered')

    useEffect(
       () => {
         getTasksData();
         // eslint-disable-next-line 
       }, []
    );
    navigate = useNavigate();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks)
    //console.log(tasks)

    const moveToAlltask = () => {
        navigate('/alltask')
        //navigate(0)
    }

    let butt = <button onClick={moveToAlltask}>View all</button>;
    let limit = null;
    if (props.page === 'dashboard') limit = 4;
    let taskItemCount = 0;
    
    const openCreateTaskModal = () => {
        $('#createTaskModal').modal('show')
    }

    function getTasksData () {
        console.log('useEffect called me')
        dispatch(getTasks());
    }

    if (props.button === 'create') butt = <button onClick={openCreateTaskModal}>Create Task</button>

    return (
        <div className={styles.container} id='tasks'>
            <div className={styles.section1}>
                <p>Task</p>
                {butt}
            </div>
            <div className={styles.other_sections}>
                <div className={styles.section2}>
                    <p className={styles.title}><img src={cal_check} alt="Task title" />Task Title</p>
                    <p><img src={time_check} alt="Date assigned" />Date Assigned</p>
                    <p><img src={time_check} alt="Submission date" />Submission date</p>
                    <p><img src={person} alt="Assigned to" />Assigned to</p>
                    <p><img src={list_status} alt="Status" />Status</p>
                </div>
                <div className={styles.section3}>
                {
                    tasks === '' || tasks === 'loading'? <p>Loading</p>
                    :
                    limit === null && tasks !== '' && tasks !== null && tasks !== undefined && Object.keys(tasks).length > 0? 
                    Object.keys(tasks).map((tk) => {
                        return <TaskItem edit={props.edit} data={tasks[tk]} />
                    } )  
                    : 
                    tasks !== '' && tasks !== null && tasks !== undefined && Object.keys(tasks).length > 0? 
                    Object.keys(tasks).map((tk) => {
                        if (taskItemCount > limit) return true
                        taskItemCount = taskItemCount + 1;
                        return <TaskItem edit={props.edit} data={tasks[tk]} />
                    } )  : <p>There are no tasks</p>
                }
                </div>
            </div>
        </div>
    )
}

export default Tasks;