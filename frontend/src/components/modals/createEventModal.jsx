import React from "react";
import styles from '../../assets/styles/modalStyles/createEvent.module.scss';
// import imageUploadIcon from '../../assets/images/imageUploadIcon.svg';

import { convertToUnixEpoch } from "../../utils/dateConversions";

import $ from 'jquery';

// import redux utility functions
import { useSelector, useDispatch } from "react-redux";

// import Post event thunk
import { postEvent } from "../../state/slices/eventSlice";

const CreateEventModal = () => {
    const eventPosted = useSelector((state) => state.event.eventPosted)
    const postingEvent = useSelector((state) => state.event.postingEvent)
    const dispatch = useDispatch();

    const removeImage = (e) => {
        e.preventDefault();
        console.log(document.getElementById('event-image').files);
        $(`.${styles.event_img_div} img`).remove();
        $(`.${styles.edit_image}`).children().remove();
        const chlabel = $(`<label for="event-image" class="${styles.eventImage}">+</label>`);
        $(`.${styles.event_img_div}`).append(chlabel);
        $('#event-image').val(null);
        console.log(document.getElementById('event-image').files);
    }


    function displayPicture(input) {
        const img = `<img alt="event_image" class="${styles.event_img}" />`
        if (input.target.files && input.target.files[0]) {
            console.log('entered here')
            console.log($(`.${styles.event_img_div}`))
            $(`.${styles.event_img_div} label`).remove()
            var reader = new FileReader();

            reader.onload = function (e) {
                $(`.${styles.event_img_div} img`).remove()
                $(`.${styles.event_img_div}`).append(img)
                $(`.${styles.event_img}`).attr('src', e.target.result);
                const rmbtn = $('<button>remove</button>').on('click', removeImage);
                const chlabel = $(`<label for="event-image" class="${styles.edit_image_label}">change image</label>`);
                $(`.${styles.edit_image}`).children().remove();
                $(`.${styles.edit_image}`).append(rmbtn);
                $(`.${styles.edit_image}`).append(chlabel);
                console.log(input.target.files);
            };
        
            reader.readAsDataURL(input.target.files[0]);
        }
    }

    const createEvent = (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (const field of $(e.target).children()) {
            if (field.hasAttribute("name") && $(field).attr("name") !== "event_datetime") {
                console.log(field)
                formData.append($(field).attr("name"), $(field).val());
            }
        }
        let event_datetime = e.target.event_datetime.value;
        try {
            event_datetime = convertToUnixEpoch(event_datetime);
            console.log(event_datetime)
            formData.append('event_datetime', event_datetime);
        } catch (e) {
            logError('Invalid datetime')
            return
        }
        const event_img = document.getElementById('event-image').files;
        console.log(event_img)
        if (event_img && event_img[0]) formData.append('event_img', event_img[0]);
        //fetch event data into a form
	    //formData.append("event_img", document.getElementById('eventImg').files[0]);
	    /*
        formData.append("event_date", "20/11/2024")
        formData.append("event_time", "12:00 pm")
        formData.append("link", "/zoom/zoom.us")
        formData.append("title", "an event for us all")
        formData.append("description", "This event would be massive");
        */
        //console.log('we are in the createEvent function')
        //$('#createEventModal').modal('hide');

        // dispatch an action to create the event
        dispatch(postEvent(formData));
    }

    const logError = (err) => {
        $(`#eventError`).text(err);
        setTimeout(() => {
            $(`#eventError`).text('')
        }, 8000)
    }

    if (postingEvent) {
        $(`.${styles.createEventBtn}`).text('Creating Event...');
        $(`.${styles.createEventBtn}`).prop('disabled', true);
    }
    else {
        $(`.${styles.createEventBtn}`).text('Create Event')
        $(`.${styles.createEventBtn}`).prop('disabled', false);
    }

    console.log(eventPosted);

    return (
        <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
            <div className="modal fade" id="createEventModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Create Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className=''>&times;</span>
                            </button>
                        </div>
                        <form className={`modal-body ${styles.modalBody}`} onSubmit={createEvent}>
                            <label>Event image</label>
                            <div className={styles.event_img_div}>
                                <label for="event-image" class={styles.eventImage}>+</label>
                                <input id="event-image" type="file" name="event_img" onChange={displayPicture}/>
                            </div>
                            <div className={styles.edit_image}>
                            </div>
                            <label>Event title</label>
                            <input name="title" type="text" id="event_title" required/>
                            <label>Description</label>
                            <textarea name="description"></textarea>
                            <label>Select event date (UTC)</label>
                            <input type="datetime-local" name="event_datetime" required />
                            <label>Location ( actual location or meet link )</label>
                            <input type="text" name="link" id="link" />
                            <p className="danger" id="eventError"></p>
                            <button type="submit" className={styles.createEventBtn}>Create Event</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEventModal;