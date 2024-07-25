import React from "react";

import styles from "../../assets/styles/reusableStyles/resultItem.module.scss";
//import brian from "../../assets/images/brian.jpg";

// import $ from 'jquery';

const VoterOne = (props) => {

    /*
    const openEditTaskModal = () => {
        $(`#editTaskModal-${props.data.id}`).modal('show')
    }
    */
    //console.log(props.data)

    return (
        <div className={styles.container} /*id={`${props.data.id}`}*/ >
            <p>{ props.voter_id }</p>
            <p className={styles.title}>{ props.voter_name }</p>
            <p>{props.voter_email}</p>
        </div>
    )
}

export default VoterOne;