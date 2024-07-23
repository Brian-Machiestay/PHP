import React from "react";
import { Link } from "react-router-dom";
import task_img from "../../assets/images/notebook-outline.svg"
import task_img_active from "../../assets/images/notebook-outline-active.svg";

const Tasklink = (props) => {
    let img = task_img;

    if (props.active === true) {
        img = task_img_active;
    }

    return (
        <Link to='/alltask'><img src={img} alt="all task" />All task</Link>
    )
}

export default Tasklink;