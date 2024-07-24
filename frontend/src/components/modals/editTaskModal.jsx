import React from "react";

import styles from '../../assets/styles/modalStyles/createTask.module.scss';
import imageUploadIcon from '../../assets/images/imageUploadIcon.svg';

import Axios from "../../utils/axiosConfig";

import { searchUsers, updateTaskID } from "../../state/slices/resultSlice";

import { useDispatch, useSelector } from "react-redux";

import { setAlertMsg } from "../../state/slices/alertSlice";

import { useState } from "react";

import $ from 'jquery';
import { unixEpochToDateTime, convertToUnixEpoch } from "../../utils/dateConversions";

const files = {};

const EditTaskModal = (props) => {
    const [key, setKey] = useState(Date.now())

    const users = useSelector((state) => state.task.userSearch)
    const dispatch = useDispatch()
    let count = 0;

    const getVolunteers = async (e) => {
        //console.log('getVolunteers called from editTask')
        dispatch(searchUsers(e.target.value))
        $(`#searchResults-${props.data.id}`).css('display', 'block');
    }

    const colapseVolunteers = (e) => {
        //console.log('collapseVolunteers called from editTask')
        $(`#searchResults-${props.data.id}`).css('display', 'none');
    }

    const closeModal = () => {
        console.log('close modal was called')
        $(`#editTaskModal-${props.data.id}`).modal('hide');
        setKey(Date.now());
    }

    const setAssigneeValue = (e) => {
        //console.log('setAssignee called from editTask')
        $(`#searchUsers-${props.data.id}`).val($(e.target).text());
        $(`#searchUsers-${props.data.id}`).attr('data-userid', e.target.dataset.id)
        //console.log($(`.${styles.assignField}`).val());
        //console.log(e.target.dataset.id)
        $(`#searchResults-${props.data.id}`).css('display', 'none');
    }

    const retrieveEditFiles = () => {
        console.log('retrieveEditFiles called from editTask')
        if (Object.keys(files).length === 3) {
            logError('only 3 files allowed')
            return
        }
        const ff = document.getElementById(`taskEdit_files-${props.data.id}`).files
        const fid = `file_${count}`
        files[fid] = ff[0];
        console.log(files);
        console.log()
        const ff_display = $(`<p class="${styles.single_file}" id="${fid}">${ff[0].name} </p>`)
        const btn_display = $(`<button type="button" id="close-${props.data.id}" className="${styles.close}" data-dismiss="" aria-label="Close">
        <span aria-hidden="true" className=''>&times;</span>
        </button>`)
        btn_display.on('click', deleteFile);
        ff_display.append(btn_display)
        $(`#files-${props.data.id}`).append(ff_display)
        count += 1;
    }

    const deleteFile = (e) => {
        console.log('deletFile called from editTask')
        console.log(files)
        const id = $(e.target).parent().attr('id');
        //console.log(id)
        delete files[id]
        $(e.target).parent().remove()
        console.log(files)
    }

    const logError = (err) => {
        $(`#taskError-${props.data.id}`).text(err);
        setTimeout(() => {
            $(`#taskError-${props.data.id}`).text('')
        }, 3000)
    }

/*
    const resetTaskTorm = () => {
        const $form = $('#createTaskForm');
        $form.find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
        $form.find(':checkbox, :radio').prop('checked', false);
    }
*/

    const editTask = (e) => {

        console.log('editTask called from editTask');

        e.preventDefault();

        console.log($(e.target));

        $(e.target).prop('disable', true);

        let formData = new FormData();

        for (const field of $(e.target).parent().parent().children()) {
            if (field.hasAttribute("name") && $(field).attr("name") !== "submission_datetime") {
                formData.append($(field).attr("name"), $(field).val());
            }
        }

        for (const field of $(e.target).parent().children()) {
            // console.log(field)
            if (field.hasAttribute("name")) {
                // console.log(field)
                formData.append($(field).attr("name"), $(field).val());
            }
        }

        const user_id = $(`#editTaskModal-${props.data.id}`).find(`.${styles.assignField}`).val();

        if (user_id.trim() !== '') {
            const uid = $(`#searchUsers-${props.data.id}`).data('userid');
            console.log(uid)
            if (uid === '' || uid === undefined) {
                logError('user does not exist');
                return
            }
            console.log(uid)
            formData.append('user_id', uid);
        }

        let submission_datetime = $(`#submission_datetime-${props.data.id}`).val();
        console.log(submission_datetime)
        //submission_date = `${submission_date[2]}/${submission_date[1]}/${submission_date[0]}`;
        formData.append('submission_datetime', convertToUnixEpoch(submission_datetime));
        // const ffs = document.getElementById('task_files').files;

        if (files.length !== 0) {

            console.log(files)
            Object.keys(files).forEach((ff) => {
                console.log(files[ff])
                formData.append("assets", files[ff]);
            });
        }

        console.log(formData);

        $(e.target).text('Editing...');

        $(e.target).prop('disabled', true);

        Axios.put(`/admin/tasks/edit/${props.data.id}`, formData).then((dt) => {

            console.log(dt['data']);

            $(e.target).text('Edit Task');

            $(e.target).prop('disabled', false);

            $(`#editTaskModal-${props.data.id}`).modal('hide');

            dispatch(updateTaskID(dt['data']))

            dispatch(setAlertMsg({
                msg: 'Task Edited Succesfully',
                level: 'good'
            }))
            closeModal()

            return dt['data'];

        }).catch((err) => {
            $(e.target).text('Edit Task')
            $(e.target).prop('disabled', false);
            if (!$(`#editTaskModal-${props.data.id}`).hasClass('show')) {
                dispatch(setAlertMsg({
                    msg: 'Could not edit Task. An error occured',
                    level: 'error'
                }))
            }

            else {
                console.log(err);
                logError(err)
            }

        })
    }

    //console.log(postingTask)
    /*
    if (postingTask) {
        $(`.${styles.createEventBtn}`).text('Creating...');
        $(`.${styles.createEventBtn}`).prop('disabled', true);
    }
    else {
        $(`.${styles.createEventBtn}`).text('Create Task')
        $(`.${styles.createEventBtn}`).prop('disabled', false);
    }
    */

    /*
    if (taskPosted === 'error') {
        logError(postingTaskError);
        //$('#createTaskModal').modal('hide');
        if (!$("#createTaskModal").hasClass('show')) {
            dispatch(setAlertMsg({
                msg: 'Could not create Task. An error occured',
                level: 'error'
            }))
        }
    }

    if (taskPosted !== 'error' && taskPosted !== 'loading' && Object.keys(taskPosted).length > 0) {
        dispatch(setAlertMsg({
            msg: 'Task created successfully',
            level: 'good'
        }))
        resetTaskTorm();
        $('#createTaskModal').modal('hide');
    }
    */

    return (
        <div className={`container ${styles.container}`} key={key}>
            {/* Bootstrap Modal */}
            <div className="modal fade" id={`editTaskModal-${props.data.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered editTaskModalContent" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Edit Task</h5>
                            <button type="button" className="close" data-dismiss="" aria-label="Close" onClick={closeModal}>
                                <span aria-hidden="true" className=''>&times;</span>
                            </button>
                        </div>
                        <form className={`modal-body ${styles.modalBody}`} id={`createTaskForm-${props.data.id}`}>
                            <label htmlFor="task_tile">Task Title</label>
                            <input type="text" name="title" id={`task_title`} required defaultValue={props.data.title} />
                            <label htmlFor="task_description">Task Description</label>
                            <textarea placeholder="design a flyer for this company" id={`task_description`} name="description" defaultValue={props.data.description}></textarea>
                            <label htmlFor={`submission_datetime-${props.data.id}`}>Submission Date</label>
                            <input type="datetime-local" name="submission_datetime" id={`submission_datetime-${props.data.id}`} defaultValue={unixEpochToDateTime(props.data.submission_datetime)}/>
                            <label>Assign task to</label>
                            <input id={`searchUsers-${props.data.id}`} type="text" className={styles.assignField} onChange={getVolunteers} placeholder="type a name" defaultValue={props.data.user?.name} data-userid={props.data.user?.user_id} />
                            <div className={styles.containResults} onBlur={colapseVolunteers}>
                                <div className={styles.searchResults} id={`searchResults-${props.data.id}`}>
                                    {
                                        users === 'loading' ? <p>Loading</p> : users === 'error' ? <p>An error occurred</p> : typeof users === 'object' ?
                                            users.map((uu) => <p key={uu.user_id} data-id={`${uu.user_id}`} onClick={setAssigneeValue}>{uu.name}</p>
                                            ) :
                                            ''
                                    }
                                </div>
                                <label htmlFor={`taskEdit_files-${props.data.id}`} class={styles.eventFiles}>Attach files (Max: 3)<img src={imageUploadIcon} alt="uploadImage" /></label>
                                <div className={styles.files} id={`files-${props.data.id}`}>
                                    {
                                    props.data.assets?.map((item) =>
                                        <p key={item.key} class={styles.single_file} id={item.id}>{item.name} <button type="button" id="close" className={styles.close} data-dismiss="" aria-label="Close">
                                            <span aria-hidden="true" className=''>&times;</span>
                                        </button></p>
                                    )
                                    }

                                </div>

                                <input id={`taskEdit_files-${props.data.id}`} type="file" name="task_files" onChange={retrieveEditFiles} />
                                <label htmlFor="others">Other things to note</label>
                                <textarea name="others" id={`others-${props.data.id}`}>{ props.data.others }</textarea>
                                <p className="danger" id={`taskError-${props.data.id}`}></p>
                                <button className={`${styles.createEventBtn}`} onClick={editTask} id={`editTaskBtn-${props.data.id}`}>Edit Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTaskModal;