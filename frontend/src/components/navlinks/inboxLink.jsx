import React from "react";
import { Link } from "react-router-dom";
import inbox_img from "../../assets/images/email-open-outline.svg"
import inbox_img_active from "../../assets/images/email-open-outline-active.svg";


const InboxLink = (props) => {
    let img = inbox_img;
    if (props.active === true) img = inbox_img_active;
    return (
        <Link to='/'><img src={img} alt="Inbox" />Inbox</Link>
    )
}

export default InboxLink;