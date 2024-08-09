import React from "react";
import styles from '../assets/styles/pageStyles/thumbspay.module.scss';


const ThumbsPay = () => {
      const transactionStatus = <span class={styles.loader}></span>
      return (
            <section className={styles.container}>
                  <h1>ThumbsPay 🗳️</h1>
                  <h2>Welcome to ThumbsPay</h2>
                  <p>You were redirected here because you went through a process that requires payment</p>
                  <p className={styles.warning}>Do not reload this page</p>
                  <p>Processing your transaction</p>
                  {
                        transactionStatus
                  }
            </section>
      )
}


export default ThumbsPay;