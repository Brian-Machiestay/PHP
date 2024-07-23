import React from "react";

import styles from "../../assets/styles/reusableStyles/menuHead.module.scss";

import menu from "../../assets/images/menu.svg";
import logo from "../../assets/images/Devatop-Logo.svg";

import NavigationStyles from "../../assets/styles/navigation.module.scss";
import $ from 'jquery';

const MenuHead = () => {

    const displayNav = () => {
        $(`.${NavigationStyles.container}`).css('margin-left', '0px')
    }

    return (
        <div className={styles.container}>
                <img src={menu} alt="menu" className={styles.menu} onClick={displayNav} />
                <img src={logo} alt="devatop logo" className={styles.logo} />
        </div>
    )
}

export default MenuHead;