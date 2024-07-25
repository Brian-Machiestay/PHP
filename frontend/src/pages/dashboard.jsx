import React from "react";
import Adminheader from "../components/reusables/adminHeader";
import Results from "../components/results";
import MenuHead from "../components/reusables/menuHead";

import styles from "../assets/styles/pageStyles/dashboard.module.scss";
import { useSelector } from "react-redux";



const Dashboard = () => {
    const result = useSelector((state) => state.results.results);

    //if (result === 'loading') return <p>Loading</p>

    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
         
            <div className={styles.section3}>
                <p className={styles.client_name}>Welcome, {result.client_name}</p>
                <Results page='dashboard' />
            </div>
        </div>
    )
}

export default Dashboard;