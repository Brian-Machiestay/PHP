import React from "react";

import $ from "jquery";
import styles from '../../assets/styles/modalStyles/adminModalStyle.module.scss';

import Axios from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { useRef, useState } from "react";



const VotingLinkModal = () => {
  const paymentOptionEl = useRef();
  const amountEl = useRef();
  const [toggle, setToggle] = useState(true);

  const toggleAmount = () => {
    setToggle(!toggle);
  }

  const sendLink = async (e) => {
    e.preventDefault();
    console.log(e.target.billing.value)
    const toastId = toast.loading('Sending voting link');
    try {
      const data = {};
      if (e.target.billing.value == 'yes') {
          const amount = e.target.amount.value;
          //console.log(amount);
          if (amount === '0' || amount === '') {
            toast.error('amount must be greater than zero', {id: toastId});
            return
          }
          data.amount = Number(amount);
        }
        data.billing = e.target.billing.value
        console.log(data);
        const response = await Axios.post('/sendLink', data);
        console.log(response['data']);
        toast.success('Link sent successfully', { id: toastId });
    } catch (e) {
        console.error(e);
        toast.error(e.response.data, { id: toastId });
    }
  }

  return (
    <>
      <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
        <div className="modal fade" id="votingLinkModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Voting Link</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className={styles.close}>&times;</span>
                </button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                <p>payment (voters should pay a fixed amout to vote)</p>
                <form className={styles.adminEmail} onSubmit={sendLink}>
                  <select name="billing" onChange={toggleAmount}>
                    <option value='yes'>Yes</option>
                    <option value='no' selected>No</option>
                  </select>
                  <label>Amount<br />
                    <input type="number" min={0} step={0.5} className={styles.email} name="amount" placeholder="1 ghc" disabled={toggle} />
                  </label>
                  <button type="submit" className="createAdminBtn">Send Link</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VotingLinkModal;