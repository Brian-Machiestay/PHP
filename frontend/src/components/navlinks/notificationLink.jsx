import React from "react";
import { Link } from "react-router-dom";
import notif_img from "../../assets/images/bell-outline.svg";
import notif_active_img from "../../assets/images/bell-outline-active.svg";

const Notificationlink = (props) => {
    let img = notif_img;
    if (props.active === true) img = notif_active_img;
    return (
        <Link to='/notifications'><img src={img} alt="notification" />Notifications</Link>
    )
}

export default Notificationlink;