import React from "react";
import Dashlink from "./navlinks/dashboardLink";
import Voterslink from "./navlinks/votersLink";
import Notificationlink from "./navlinks/notificationLink";
import Logout from "./navlinks/logout";
import styles from "../assets/styles/navigation.module.scss";
import { Link } from "react-router-dom";
import CreateAdminBtn from "./reusables/createAdminBtn";
import $ from 'jquery';

const Navigation = () => {

    const active = true
    const closeNav = () => {
        $(`.${styles.container}`).css('margin-left', '-1000px');
    }

    return (
            <section className={styles.container}>
                <div className={styles.close} onClick={closeNav}>
                    <span aria-hidden="true" className={styles.times}>&times;</span>
                </div>
                <Link to='/' className={styles.logo}><p>Thumbs</p></Link>
                <Dashlink active={active} />
                <Voterslink active={active} />
                <Notificationlink active={active} />
                <Logout />
                <div className={styles.createAdminBtn}><CreateAdminBtn /></div>
            </section>
    )
}

export default Navigation;