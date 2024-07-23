import React from "react";
import { Link } from "react-router-dom";
import vol_img from "../../assets/images/account-group-outline.svg";
import vol_active_img from "../../assets/images/account-group-outline-active.svg";

const Volunteerlink = (props) => {
    let img = vol_img;
    if (props.active === true) img = vol_active_img;
    return (
        <Link to='/voters'><img src={img} alt="voters" />Voters</Link>
    )
}

export default Volunteerlink;