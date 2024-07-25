import React from "react";
import { Link } from "react-router-dom";
import voter_img from "../../assets/images/notebook-outline.svg"
import voter_img_active from "../../assets/images/notebook-outline-active.svg";

const Tasklink = (props) => {
    let img = voter_img;

    if (props.active === true) {
        img = voter_img_active;
    }

    return (
        <Link to='/voters'><img src={img} alt="voters" />voters</Link>
    )
}

export default Tasklink;