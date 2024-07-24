import React from "react";
import Adminheader from "../components/reusables/adminHeader";
import Results from "../components/results";
import MenuHead from "../components/reusables/menuHead";

import styles from "../assets/styles/pageStyles/dashboard.module.scss";


const Dashboard = () => {

    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
         
            <div className={styles.section3}>
                <p className={styles.client_name}>Welcome, Payswitch</p>
                <Results page='dashboard' />
            </div>
        </div>
    )
}

export default Dashboard;