import React, { useEffect } from "react";

import $ from "jquery";
import styles from '../../assets/styles/modalStyles/adminModalStyle.module.scss';
import Axios from "../../utils/axiosConfig";

import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const VoterModal = () => {
  const navigate = useNavigate('');
  const voterEl = useRef('');
  const voterEmailEl = useRef('');

  const submitVoter = async (e) => {
    e.preventDefault();
    const voter_name = $(voterEl.current).val()
    const voter_email = $(voterEmailEl.current).val();
    if (voter_name === '' || voter_email === '') return
    const toastId = toast.loading('add voter to the system');
    try {
      const data = {
        "name": voter_name,
        "email": voter_email
      }
      console.log(data)
      const dt = await Axios.post('/voter', data)
      console.log(dt['data']);
      $('#createVoterModal').modal('hide')
      toast.success('Voter added to the system', {id: toastId});
    } catch (e) {
      console.log(e)
      $('#createVoterModal').modal('hide')
      if (e.response.status === 401) navigate('/login');
      toast.error(e.response.data, { id: toastId });
    }
    //$('#createPortfolioModal').modal('show')
  }

  


  return (
    <>
      <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
        <div className="modal fade" id="createVoterModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Create Voter</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className={styles.close}>&times;</span>
                </button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                
                <form className={styles.adminEmail} onSubmit={submitVoter}>
                  <label>Voter Email<br />
                    <input type="email" className={styles.email} id='category' name="category" placeholder="president" ref={voterEmailEl}/>
                  </label>
                  <label>Voter Name<br />
                    <input type="text" className={styles.email} id='category' name="category" placeholder="president" ref={voterEl}/>
                  </label>
                  <button type="submit" className="createAdminBtn">Add Voter</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VoterModal;