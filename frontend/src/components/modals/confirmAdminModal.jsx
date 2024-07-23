import React from "react";

import styles from '../../assets/styles/modalStyles/confirmAdminModalStyle.module.scss';

const ConfirmAdminModal = () => {
    return (
        <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
            <div className="modal fade" id="confirmAdminModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header border-0">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" className={styles.close}>&times;</span>
                        </button>
                    </div>
                    <div className={`modal-body ${styles.modalBody}`}>
                        <p>You have successfully made <span>'brian@gmail.com'</span> an admin</p>
                        <button type="submit" className="deactivatebtn">Deactivate Admin</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmAdminModal;