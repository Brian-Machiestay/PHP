import React from "react";
import { Link } from "react-router-dom";
import event_img from "../../assets/images/bulletin-board.svg"
import event_img_active from "../../assets/images/bulletin-board-active.svg";


const EventLink = (props) => {
    let img = event_img;
    if (props.active === true) img = event_img_active;
    return (
        <Link to='/candidates'><img src={img} alt="candidates" />Candidates</Link>
    )
}

export default EventLink;