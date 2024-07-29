import React from "react";

import $ from "jquery";
import styles from '../../assets/styles/modalStyles/adminModalStyle.module.scss';

import ConfirmAdminModal from "./confirmAdminModal";
import Axios from "../../utils/axiosConfig";

const portfolioModal = () => {

  const submitPortfolio = async (e) => {
    e.preventDefault();
    $('#createPortfolioModal').modal('hide')

    try {
      const data = {
        "category": $(e.target.category).val()
      }
      console.log(data)
      const dt = await Axios.post('/portfolio', data)
      console.log(dt['data']);
    } catch (e) {
      console.log(e)

    }
    //$('#createPortfolioModal').modal('show')
  }

  return (
    <>
      <ConfirmAdminModal />
      <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
        <div className="modal fade" id="createPortfolioModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Create portfolio</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className={styles.close}>&times;</span>
                </button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                <p>Portfolio Name</p>
                <form className={styles.adminEmail} onSubmit={submitPortfolio}>
                  <input type="text" className={styles.email} id='category' name="category" placeholder="president" />
                  <button type="submit" className="createAdminBtn">Create Portfolio</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default portfolioModal;