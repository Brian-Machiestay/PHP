import React from "react";
import TaskStatus from "../components/reusables/taskStatus";
import Filter from "../components/filter";
import Adminheader from "../components/reusables/adminHeader";
import Tasks from "../components/tasks";
import MenuHead from "../components/reusables/menuHead";

import styles from "../assets/styles/pageStyles/dashboard.module.scss";


const Dashboard = () => {

    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
            <div className={styles.section2}>
                <TaskStatus text="Unassigned Tasks" />
                <TaskStatus status="completed" text="Completed Tasks" />
                <TaskStatus status="progress" text="In progress Tasks" />
            </div>
            <div className={styles.section3}>
                <h2>Voluteer Search</h2>
                <Filter />
                <Tasks page='dashboard' />
            </div>
        </div>
    )
}

export default Dashboard;