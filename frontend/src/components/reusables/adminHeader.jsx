import React from "react";

import Search from "./search";
import CreateAdminBtn from "./createAdminBtn";
import Aside from "./aside";
import AdminModal from "../modals/adminModal";

import styles from "../../assets/styles/reusableStyles/adminHeader.module.scss";

import notif from "../../assets/images/bell-outline.svg";


const Adminheader = () => {
    return (
        <>
            <Aside />
            <div className={styles.container}>
                <CreateAdminBtn />
                <img src={notif} alt="notifications" />
                <p>Admin</p>
            </div>
            <AdminModal />
        </>
    )
}

export default Adminheader;