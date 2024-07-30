import React, { useEffect } from "react";

import $ from "jquery";
import styles from '../../assets/styles/modalStyles/adminModalStyle.module.scss';

import ConfirmAdminModal from "./confirmAdminModal";
import Axios from "../../utils/axiosConfig";

import { useRef } from "react";

const CandidateModal = () => {
  const candidateEl = useRef('');
  const portfolioEl = useRef('');
  const portfoliosEl = useRef('');
  const candidateEmailEl = useRef('');

  const submitCandidate = async (e) => {
    e.preventDefault();
    const candidate_name = $(candidateEl.current).val()
    const portfolio_id =  $(portfolioEl.current).data('id');
    const candidate_email = $(candidateEmailEl.current).val();
    console.log(portfolio_id)
    if (portfolio_id === undefined) {
      return
    }

    try {
      const data = {
        "name": candidate_name,
        "portfolio_id": portfolio_id,
        "email": candidate_email
      }
      console.log(data)
      const dt = await Axios.post('/candidate', data)
      console.log(dt['data']);
      $('#createCandidateModal').modal('hide')
    } catch (e) {
      console.log(e)

    }
    //$('#createPortfolioModal').modal('show')
  }

  const getPortfolios = async () => {
    console.log(portfolioEl)
    $(portfoliosEl.current).css('display', 'block');
    try {
      const pps = await Axios.get('/portfolios');
      console.log(pps['data']);

      pps['data'].map((dd) => {
        const el = $(`<p data-id= ${dd.id}>${dd.category}</p>`);
        el.on('click', setPortfolioValue);
        $(portfoliosEl.current).append(el)
    })
    } catch (e) {
      console.log(e);
    }
  }

  const closePortfolios = () => {
    console.log('close the portfolios div')
    $(portfoliosEl.current).css('display', 'none');
  }

  const setPortfolioValue = (e) => {
    //console.log('...setting')
    //console.log($(e.target).data('id'))
    $(portfolioEl.current).val($(e.target).text());
    $(portfolioEl.current).data('id', $(e.target).data('id'));
    $(portfoliosEl.current).css('display', 'none');
  }

  return (
    <>
      <ConfirmAdminModal />
      <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
        <div className="modal fade" id="createCandidateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Create Candidate</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className={styles.close}>&times;</span>
                </button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                
                <form className={styles.adminEmail} onSubmit={submitCandidate}>
                  <label>Candidate Email<br />
                    <input type="email" className={styles.email} id='category' name="category" placeholder="president" ref={candidateEmailEl}/>
                  </label>
                  <label>Candidate Name<br />
                    <input type="text" className={styles.email} id='category' name="category" placeholder="president" ref={candidateEl}/>
                  </label>
                  <div className={styles.portfolios} >
                    <label>Portfolio<br />
                      <input type="text" className={styles.email} id='category' name="category" placeholder="president" onChange={getPortfolios}  ref={portfolioEl} />
                    </label>
                    <div className={styles.portfolioResults} ref={portfoliosEl}>
                      
                    </div>
                  </div>
                  <button type="submit" className="createAdminBtn">Create Candidate</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateModal;