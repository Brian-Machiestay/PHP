import React from "react";
import styles from '../../assets/styles/reusableStyles/eventStyle.module.scss';
import banner from '../../assets/images/roads.jpeg';
import person from '../../assets/images/brian.jpg';

import ViewEventModal from "../modals/viewEventModal";

import $ from 'jquery';

const Event = (props) => {
    const showEventModal = () => {
        console.log('right here');
        $(`#${props.data.id}`).modal('show');
    }

    //console.log(props.data)

    const formatDatetime = (unixEpoch) => {
        const datetime = new Date(unixEpoch * 1000); // Convert to milliseconds

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Extract date components
        const year = datetime.getFullYear();
        const dayOfWeek = dayNames[datetime.getDay()];
        const dayOfMonth = String(datetime.getDate()).padStart(2, '0');
        const month = monthNames[datetime.getMonth()];

        // Extract time components
        const hours = String(datetime.getHours()).padStart(2, '0');
        const minutes = String(datetime.getMinutes()).padStart(2, '0');
        // const seconds = String(datetime.getSeconds()).padStart(2, '0');

        // Construct the nice string
        const res = [];
        res.push(`${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`)
        res.push(`${hours}:${minutes} UTC`)
        //const niceString = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}    &bull;    ${hours}:${minutes} UTC`;

        return res;
    }

    return (
        <>
        <div className={styles.container} onClick={showEventModal}>
            <div className={styles.banner}>
                {props.data.event_img === null || props.data.event_img === undefined? <img src={banner} alt="default banner" />:
                <img src={'https://volunteers.devatop.org' + props.data.event_img} alt="banner" />
                }</div>
            <div className={styles.details}>
                <p className={styles.date}>{formatDatetime(props.data.event_datetime)[0]} &bull; {formatDatetime(props.data.event_datetime)[1]}</p>
                <p className={styles.eventTitle}>{props.data.event_title}</p>
                <div className={styles.attendees}>
                    <div className={styles.attendant}>
                        <img src={person} alt="brian"/>
                    </div>
                    <div className={styles.attendant}>
                        <img src={person} alt="brian"/>
                    </div>
                    <div className={styles.attendant}>
                        <img src={person} alt="brian"/>
                    </div>

                    <p>80 + going</p>
                </div>
            </div>
        </div>
        <ViewEventModal data={props.data} />
        </>
    )
}

export default Event;