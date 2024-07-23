import React from "react";
import Dashlink from "./navlinks/dashboardLink";
import Tasklink from "./navlinks/taskLink";
import Notificationlink from "./navlinks/notificationLink";
import Volunteerlink from "./navlinks/votersLink";
import InboxLink from "./navlinks/inboxLink";
import EventLink from "./navlinks/candidatesLink";
import Logout from "./navlinks/logout";
import styles from "../assets/styles/navigation.module.scss";
import { Link } from "react-router-dom";

import logo from "../assets/images/Devatop-Logo.svg";
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
                <Tasklink active={active} />
                <Notificationlink active={active} />
                <Volunteerlink active={active}/>
                <InboxLink active={active} />
                <EventLink active={active}/>
                <Logout />
                <div className={styles.createAdminBtn}><CreateAdminBtn /></div>
            </section>
    )
}

export default Navigation;