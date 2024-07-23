import React from "react";
import Adminheader from "../components/reusables/adminHeader";
import Tasks from "../components/tasks";
import MenuHead from "../components/reusables/menuHead";
import CreateTaskModal from "../components/modals/createTaskModal";
//import EditTaskModal from "../components/modals/editTaskModal";

import styles from "../assets/styles/pageStyles/alltasks.module.scss";


const Alltask = () => {
    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
            <Tasks button='create' edit= {true} />
            <CreateTaskModal />
        </div>
    )
}

export default Alltask;