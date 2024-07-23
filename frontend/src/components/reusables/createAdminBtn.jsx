import React from "react"
import styles from "../../assets/styles/reusableStyles/createAdminBtn.module.scss";
import $ from "jquery";

const CreateAdminBtn = () => {

    const openCreateAdminModal = (e) => {
        console.log('clicked')
        $('#createAdminModal').modal('show');
    }

    return (
        <button className={styles.container} onClick={openCreateAdminModal}>Create Admin</button>
    )
}

export default CreateAdminBtn;