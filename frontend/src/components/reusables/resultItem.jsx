import React from "react";

import styles from "../../assets/styles/reusableStyles/resultItem.module.scss";
//import brian from "../../assets/images/brian.jpg";

// import $ from 'jquery';

const TaskItem = (props) => {

    /*
    const openEditTaskModal = () => {
        $(`#editTaskModal-${props.data.id}`).modal('show')
    }
    */
    //console.log(props.data)

    return (
        <>
        {
            props.vote_count === undefined? 
            <div className={styles.container} /*id={`${props.data.id}`}*/ >
                <p>{ props.candidate_id }</p>
                <p className={styles.title}>{ props.candidate_name }</p>
                <p>{props.portfolio}</p>
            </div>
            
            :

            <div className={styles.container} /*id={`${props.data.id}`}*/ >
                <p>{ props.candidate_id }</p>
                <p className={styles.title}>{ props.candidate_name }</p>
                <p>{props.portfolio}</p> 
                <p className={styles.count}>{props.vote_count}</p>
            </div>
        }
        </>
    )
}

export default TaskItem;