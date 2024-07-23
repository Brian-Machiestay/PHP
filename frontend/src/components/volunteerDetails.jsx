import React from "react";

import styles from "../assets/styles/tasks.module.scss";
import dtStyles from "../assets/styles/volunteerDetails.module.scss";

import status_img from "../assets/images/list-status.svg";

import ReviewModal from "./modals/reviewModal";

import $ from 'jquery';

const VolunteerDetails = () => {
    const openReviewModal = () => {
        $('#reviewModal').modal('show')
    }

    const openTaskAssignModal = () => {
        $('#createTaskModal').modal('show')
    }

    return (
        <div className={`${styles.details} ${dtStyles.container}`}>
            <p className={dtStyles.initials}>Nn</p>
            <p className={dtStyles.name}>Amanda Joeffery</p>
            <p className={dtStyles.email}>Amanda@gmail.com</p>
            <h2 className={dtStyles.others}>Other information</h2>
            <p className={dtStyles.country}><span className={dtStyles.label}>Country</span> - <span className={dtStyles.actual}>Nigeria</span></p>
            <p className={dtStyles.skill}><span className={dtStyles.label}>Skill Type</span> - <span className={dtStyles.skill_type}>Data Analyst</span></p>
            <p className={dtStyles.skill}><span className={dtStyles.label}>Skill Type</span> - <span className={dtStyles.skill_type}>Data Analyst</span></p>
            <button className={dtStyles.deactivate}>Deactivate User</button>
            <div className={dtStyles.current_task}>
                <p className={dtStyles.current_head}>Current Task</p>
                <p className={dtStyles.status_head}><img src={status_img} alt="status" />Status</p>
                <p className={dtStyles.status}>Pending</p>
            </div>
            <p className={dtStyles.description_label}>Description</p>
            <p className={dtStyles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe deleniti, aliquid fuga laborum blanditiis quaerat commodi tempore quidem, fugiat odio, velit deserunt dolor neque voluptate aperiam ad soluta quasi fugit!</p>
            <button className={dtStyles.new_task} onClick={openTaskAssignModal}>Assign New Task</button>
            <h2 className={dtStyles.previous}>Previous Tasks</h2>
            <div className={dtStyles.previous_task}>
                <p className={dtStyles.description_label}>Description</p>
                <p className={dtStyles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio magnam nemo sequi iste, perferendis exercitationem ad, <a href="/">Read more</a></p>
                <p className={dtStyles.finished}>August 20 - August 25, 2023</p>
            </div>
            <div className={dtStyles.previous_task}>
                <p className={dtStyles.description_label}>Description</p>
                <p className={dtStyles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio magnam nemo sequi iste, perferendis exercitationem ad, <a href="/">Read more</a></p>
                <p className={dtStyles.finished}>August 20 - August 25, 2023</p>
            </div>
            <button className={dtStyles.review} onClick={openReviewModal}>Leave a Review</button>
            <ReviewModal />
        </div>
    )
}

export default VolunteerDetails;