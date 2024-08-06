import React from "react";
import { Link } from "react-router-dom";
import settings_icon from '../../assets/images/settings.svg';
import styles from '../../assets/styles/reusableStyles/settingsLink.module.scss';

const SettingsLink = (props) => {
    return (
        <Link to='/candidates'><img src={settings_icon} alt="candidates" className={styles.settingsLink} />Settings</Link>
    )
}

export default SettingsLink;