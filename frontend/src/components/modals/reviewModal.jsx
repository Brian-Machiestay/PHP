import React from "react";

import styles from '../../assets/styles/modalStyles/reviewModalStyle.module.scss';

import $ from 'jquery';

const ReviewModal = () => {
    function getReviewValue (e) {
        const tgEl = e.target;
        if ($(tgEl).hasClass(`${styles.star}`)) {
            for (const el of $(e.currentTarget).children()){
                $($(el).children()[0]).removeClass(`${styles.chosen}`)
                $($(el).children()[0]).html('&#9734;')
            }
            for (const child of $(tgEl).parent().prevAll('p')) {
                $($(child).children()[0]).html('&#9733;')
                $($(child).children()[0]).removeClass(`${styles.chosen}`)
                $($(child).children()[0]).addClass(`${styles.chosen}`)
            }
            $(tgEl).html('&#9733;')
            $(tgEl).addClass(`${styles.chosen}`)
        }
    }


    return (
        <div className={`container ${styles.container}`}>
        {/* Bootstrap Modal */}
            <div className="modal fade" id="reviewModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Leave a Review</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" className=''>&times;</span>
                        </button>
                    </div>
                    <div className={`modal-body ${styles.modalBody}`}>
                        <p className={styles.rateHead}>Rate Volunteer</p>
                        <div className={styles.stars} onClick={getReviewValue}>
                            <p><span className={styles.star} data-value="1">&#9734;</span><span>Very Bad</span></p>
                            <p><span className={styles.star} data-value="2">&#9734;</span><span>Poor</span></p>
                            <p><span className={styles.star} data-value="3">&#9734;</span><span>Medium</span></p>
                            <p><span className={styles.star} data-value="4">&#9734;</span><span>Good</span></p>
                            <p><span className={styles.star} data-value="5">&#9734;</span><span>Excellent</span></p>
                        </div>
                        <p className={styles.reviewHead}>Review</p>
                        <textarea className={styles.review}></textarea>
                        <button type="submit" className={styles.submitReview}>Submit</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewModal;