import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlertMsg } from "../../state/slices/alertSlice";

import styles from '../../assets/styles/reusableStyles/alert.module.scss';

//import $ from 'jquery';

const Alert = () => {
    const dispatch = useDispatch();
    const alertmsg = useSelector((state) => state.alert.alertmsg)
    console.log(alertmsg)

    if (alertmsg !== '') {
        //$(`.${styles.container}`).css('display', 'block')
        setTimeout(() => {
            //$(`.${styles.container}`).css('display', 'none');
            dispatch(setAlertMsg(''))
        }, 3000)
        return (
            <div className={`alert alert-primary ${styles.container} ${alertmsg.level}`} role="alert">
                <p className={styles.msg}>{alertmsg.msg}</p>
            </div>
        )
    }
}

export default Alert;