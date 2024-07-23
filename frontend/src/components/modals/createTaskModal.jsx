import React from "react";

import styles from '../../assets/styles/modalStyles/createTask.module.scss';
import imageUploadIcon from '../../assets/images/imageUploadIcon.svg';

import { convertToUnixEpoch } from "../../utils/dateConversions";

import { postTask, searchUsers, clearTaskPosted} from "../../state/slices/taskSlice";

import { useDispatch, useSelector } from "react-redux";

import { setAlertMsg } from "../../state/slices/alertSlice";

import { useState } from "react";

import $ from 'jquery';
const files = {};
let count = 0;

const CreateTaskModal = () => {
    const [key, setKey] = useState(Date.now())
    //console.log('this is create task modal')
    const users = useSelector((state) => state.task.userSearch)
    const postingTask = useSelector((state) => state.task.postingTask);
    const taskPosted = useSelector((state) => state.task.taskPosted)
    const postingTaskError = useSelector((state) => state.task.postingTaskError)
    //const task = useSelector((state) => state.task.taskPosted)
    //console.log(typeof users)
    const dispatch = useDispatch()
    //let count = 0;

    const closeModal = () => {
        setKey(Date.now())
        $('#createTaskModal').modal('hide')
    }

    const getVolunteers = async (e) => {
        if (taskPosted !== 'error' && taskPosted !== 'loading' && Object.keys(taskPosted).length > 0) {
            dispatch(clearTaskPosted())
        }
        dispatch(searchUsers(e.target.value))
        $('#searchResults').css('display', 'block');
    }

    const colapseVolunteers = (e) => {
        $('#searchResults').css('display', 'none');
    }

    const setAssigneeValue = (e) => {
        $('#searchUsers').val($(e.target).text());
        $('#searchUsers').attr('data-id', e.target.dataset.id)
        console.log($(`.${styles.assignField}`).val());
        console.log(e.target.dataset.id)
        $('#searchResults').css('display', 'none');
    }

    const retrieveFiles = () => {
        console.log('create task retrieve files was called')
        if (Object.keys(files).length === 3) {
            logError('only 3 files allowed')
            return
        }
    
        const ff = document.getElementById('task_files').files
        const fid = `file_${count}`
        files[fid] = ff[0];
        console.log(files);
        console.log($('#createTaskAssets'));
        //console.log($('.createTaskModalContent').find(`.${styles.files}`))
        const ff_display = $(`<p class="${styles.single_file}" id="${fid}">${ff[0].name}</p>`);
        const btn_display = $(`<button type="button" id="close" className="${styles.close}" data-dismiss="" aria-label="Close">
            <span aria-hidden="true" className=''>&times;</span>
        </button>`)
        btn_display.on('click', deleteFile);
        ff_display.append(btn_display);
        $('#createTaskAssets').append(ff_display);
        count += 1;
    }


    const deleteFile = (e) => {
        console.log(files)
        const id = $(e.target).parent().parent().attr('id');
        //console.log(id)
        delete files[id]
        $(e.target).parent().parent().remove()
        console.log(files)
    }

    const logError = (err) => {
        $(`#taskError`).text(err);
        setTimeout(() => {
            $(`#taskError`).text('')
        }, 8000)
    }

    /*
    const resetTaskTorm = () => {
        const $form = $('#createTaskForm');
        $form.find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
        $form.find(':checkbox, :radio').prop('checked', false);
    }
    */

    const createTask = (e) => {
        e.preventDefault();
        console.log($(e.target))
        $(e.target).prop('disable', true);
        console.log('fields appended')
        let formData = new FormData();
        for (const field of $(e.target).parent().parent().children()) {
            if (field.hasAttribute("name") && $(field).attr("name") !== "submission_datetime") {
                formData.append($(field).attr("name"), $(field).val());
                console.log(($(field).attr("name")))
            }
        }
        for (const field of $(e.target).parent().children()) {
            //console.log(field)
            if (field.hasAttribute("name")) {
                console.log('other feilds appended')
                formData.append($(field).attr("name"), $(field).val());
                console.log($(field).attr("name"))
            }
        }
        const user_id = $('.createTaskModalContent').find(`.${styles.assignField}`).val();
        //console.log($('#createTaskForm'));
        //console.log($(`.${styles.assignField}`))

        //console.log(user_id)
        if (user_id.trim() !== '') {
            //console.log('dont enter here')
            const uid = $(`#createTaskForm .${styles.assignField}`).attr('data-id');
            if (uid === '' || uid === undefined) {
                logError('user does not exist');
                return
            }
            console.log(uid)
            formData.append('user_id', uid);
        }
        try {
            let submission_datetime = $('.createTaskModalContent').find('#submission_datetime').val();
            const sub_dt = convertToUnixEpoch(submission_datetime)
            //submission_date = `${submission_date[2]}/${submission_date[1]}/${submission_date[0]}`;
            //console.log(submission_date)
            formData.append('submission_datetime', sub_dt);
            //const ffs = document.getElementById('task_files').files;
        } catch (e) {
            logError('Invalid datetime')
            return
        }
        
        if (files.length !== 0) {
            //console.log(typeof ffs);
            console.log(files)
            Object.keys(files).forEach((ff) => {
                console.log(files[ff])
                formData.append("assets", files[ff]);
            }); 
            //formData.append('assets', ffs);
        }
        console.log(formData)
        dispatch(postTask(formData))
    }

    if (taskPosted !== 'error' && taskPosted !== 'loading' && Object.keys(taskPosted).length > 0) {
        console.log('check 1 passed')
        dispatch(setAlertMsg({
            msg: 'Task created successfully',
            level: 'good'
        }))
        //resetTaskTorm();
        $('#createTaskModal').modal('hide');
    }
    else if (taskPosted === 'error') {
            console.log('check 2 passed')
            logError(postingTaskError);
            //$('#createTaskModal').modal('hide');
            if (!$("#createTaskModal").hasClass('show')) {
                dispatch(setAlertMsg({
                    msg: 'Could not create Task. An error occured',
                    level: 'error'
            }))
        }
    }

    console.log(postingTask)

    if (postingTask) {
        $('#createTaskBtn').text('Creating...');
        $('#createTaskBtn').prop('disabled', true);
    }
    else {
        $('#createTaskBtn').text('Create Task')
        $('#createTaskBtn').prop('disabled', false);
    }
    
    return (
        <div className={`container ${styles.container}`} key={key}>
        {/* Bootstrap Modal */}
            <div className="modal fade" id="createTaskModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered createTaskModalContent" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Create Task</h5>
                            <button type="button" className="close" data-dismiss="" aria-label="Close" onClick={closeModal}>
                            <span aria-hidden="true" className=''>&times;</span>
                            </button>
                        </div>
                        <form className={`modal-body ${styles.modalBody}`} id="createTaskForm">
                            <label htmlFor="task_tile">Task Title</label>
                            <input type="text" name="title" id="task_title" required />
                            <label htmlFor="task_description">Task Description</label>
                            <textarea placeholder="design a flyer for this company" id="task_description" name="description"></textarea>
                            <label htmlFor="submission_datetime">Submission Date</label>
                            <input type="datetime-local" name="submission_datetime" id="submission_datetime" />
                            <label>Assign task to</label>
                            <input id="searchUsers" type="text" className={`${styles.assignField} createTaskAssignField`} onChange={getVolunteers} placeholder="type a name" />
                            <div className={styles.containResults} onBlur={colapseVolunteers}>
                                <div className={styles.searchResults} id='searchResults'>
                                    {
                                    users === 'loading'? <p>Loading</p> : users === 'error'? <p>An error occurred</p>: typeof users === 'object'?
                                    users.map((uu) => <p key={uu.user_id} data-id={`${uu.user_id}`} onClick={setAssigneeValue}>{uu.name}</p>
                                    ) :
                                    ''
                                    }
                                </div>
                            <label for="task_files" class={styles.eventFiles}>Attach files (Max: 3)<img src={imageUploadIcon} alt="uploadImage" /></label>
                            <div className={styles.files} id="createTaskAssets">
                                
                            </div>
                                
                            <input id="task_files" type="file"  name="task_files" onChange={retrieveFiles} />
                            <label htmlFor="others">Other things to note</label>
                            <textarea name="others" id="others"></textarea>
                            <p className="danger" id="taskError"></p>
                            <button className={styles.createEventBtn} onClick={createTask} id="createTaskBtn">Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskModal;