import React from "react";
import Event from "../components/reusables/event";
import styles from '../assets/styles/pageStyles/events.module.scss';
import MenuHead from "../components/reusables/menuHead";
import Adminheader from "../components/reusables/adminHeader";
//import ViewEventModal from "../components/modals/viewEventModal";
import CreateEventModal from "../components/modals/createEventModal";

import { getEvents } from "../state/slices/eventSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


import $ from 'jquery';

const Events = () => {
    const displayCreateEventModal = () => {
        $('#createEventModal').modal('show')
    }

    const events = useSelector((state) => state.event.events);
    const postedEvent = useSelector((state) => state.event.eventPosted); 
    const dispatch = useDispatch();

    function getEventData(filter) {
        dispatch(getEvents(filter))
    }
    
    function getPastEVents() {
        $(`.${styles.title}`).text('Past Events')
        getEventData('past');
    }

    function getFutureEvents() {
        $(`.${styles.title}`).text('Upcoming Events')
        getEventData('upcoming');
    }

    //if (events === "loading") return <p>Loading</p>
    useEffect(
         // eslint-disable-next-line react-hooks/exhaustive-deps
        () => getEventData('upcoming'), [postedEvent]);

    return (
        <div className={styles.container}>
            <MenuHead />
            <Adminheader />
            <p className={styles.title}>Upcoming Events</p>
            <div className={styles.eventsbtn}>
                <button autoFocus onClick={getFutureEvents}>Upcoming</button>
                <button onClick={getPastEVents}>Past</button>
                <button onClick={displayCreateEventModal}>Create event</button>
            </div>
            <div className={styles.events}>{
                events === "loading"? "Loading": events === null? 'An error occured, check your internet connection or login again':
                Object.keys(events).length === 0? "There are no events at this time":
                Object.keys(events).map((key) => <Event key={key} data={events[key]} />)
            }
            </div>
            <CreateEventModal />
        </div>
    )
}

export default Events;