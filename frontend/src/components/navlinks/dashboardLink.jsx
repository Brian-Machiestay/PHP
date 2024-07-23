import React from "react";
import { Link } from "react-router-dom";
import dashImg from "../../assets/images/Vector.svg";
import dashImg_active from "../../assets/images/Vector-active.svg"


const Dashlink = (props) => {
    let img = dashImg;
    if (props.active === true) img = dashImg_active
    return (
        <Link to='/'>&nbsp;<img src={img} alt="dashboard" />&nbsp;Dashboard</Link>
    )
}

export default Dashlink;