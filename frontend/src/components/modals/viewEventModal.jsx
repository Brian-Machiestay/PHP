import React from 'react';
import styles from '../../assets/styles/reusableStyles/eventStyle.module.scss';
import viewEventStyle from '../../assets/styles/modalStyles/viewEventStyle.module.scss';
import banner from '../../assets/images/roads.jpeg';
import person from '../../assets/images/brian.jpg';


const ViewEventModal = (props) => {

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
        <div className={`container`}>
        {/* Bootstrap Modal */}
        <div className="modal fade" id={props.data.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className={`modal-dialog modal-lg modal-dialog-centered ${viewEventStyle.dialog}`} role="document">
            <div className="modal-content">
              
              <div className={`modal-body ${styles.modalBody} ${viewEventStyle.modalBody}`}>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className={styles.close}>&times;</span>
                </button>
              <div className={`${styles.container} ${viewEventStyle.eventContainer}`}>
                <div className={styles.banner}>{props.data.event_img === null || props.data.event_img === undefined? <img src={banner} alt="default banner" />:
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
            <p className={viewEventStyle.description}>{props.data.description}</p>
            <p className={viewEventStyle.location}>Location: <span className={viewEventStyle.link}>{props.data.link}</span></p>
            </div>
            <div className={viewEventStyle.register}>
                <button>I will attend</button>
                <button>I will not attend</button>
                <button className={viewEventStyle.calendar}>Add to Calendar</button>
            </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ViewEventModal;