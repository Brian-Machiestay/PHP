import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation";
import styles from "../assets/styles/pageStyles/layout.module.scss";

const Layout = () => {
    return (
        <div className={styles.container}>
            <Navigation />
            <Outlet />
        </div>
    )
}

export default Layout;