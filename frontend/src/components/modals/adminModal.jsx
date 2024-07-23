import React from "react";

import $ from "jquery";
import styles from '../../assets/styles/modalStyles/adminModalStyle.module.scss';

import ConfirmAdminModal from "./confirmAdminModal";

const AdminModal = () => {

  const submitEmail = (e) => {
    e.preventDefault();
    $('#createAdminModal').modal('hide')
    $('#confirmAdminModal').modal('show')
  }

  return (
    <>
      <ConfirmAdminModal />
      <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
        <div className="modal fade" id="createAdminModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Create Admin</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className={styles.close}>&times;</span>
                </button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                <p>Admin Email Address</p>
                <form className={styles.adminEmail} onSubmit={submitEmail}>
                  <input type="email" className={styles.email} id='adminEmail' placeholder="mufasa@gmail.com" />
                  <button type="submit" className="createAdminBtn">Create Admin</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminModal;