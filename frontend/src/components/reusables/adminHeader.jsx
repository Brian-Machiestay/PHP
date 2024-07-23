import React from "react";

import Search from "./search";
import CreateAdminBtn from "./createAdminBtn";
import Aside from "./aside";
import AdminModal from "../modals/adminModal";

import styles from "../../assets/styles/reusableStyles/adminHeader.module.scss";

import notif from "../../assets/images/bell-outline.svg";
import pureLogo from "../../assets/images/pureLogo.jpg";


const Adminheader = () => {
    return (
        <>
            <Aside />
            <div className={styles.container}>
                <Search />
                <CreateAdminBtn />
                <img src={notif} alt="notifications" />
                <img src={pureLogo} alt="logo" />
                <p>Admin</p>
            </div>
            <AdminModal />
        </>
    )
}

export default Adminheader;