import React from "react";
import styles from '../assets/styles/pageStyles/vote.module.scss';
import vote_img from '../assets/images/Mobile-voting.jpg';


const Vote = () => {
      return(
            <div className={styles.container}>
                  <h1>Payswitch goes to the polls</h1>
                  <img src={vote_img} />
                  <button>start voting</button>
            </div>
      )
}

export default Vote;