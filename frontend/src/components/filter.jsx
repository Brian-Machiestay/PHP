import React from "react";

import styles from "../assets/styles/filter.module.scss";

import search_img from "../assets/images/search.svg";

//import { increment } from "../state/slices/incrementSlice";

//import { useSelector, useDispatch } from "react-redux";

//import { fetchData } from "../state/slices/incrementSlice";



const Filter = () => {
    const doSomething = () => {
        console.log('doing something when filter input changes')
    }

    return (
        <form className={styles.container}>
            <div className={styles.volunteer_search}>
                <img src={search_img} alt="search volunteers" />
                <input type="text" name="volunteer" placeholder="volunteer name" onChange={doSomething}></input>
            </div>
            <input type="text" name="submission_date" placeholder="submission date
            " onFocus= {(e) => e.type ='date'} onChange={doSomething}></input>
            <select name="status">
                <option aria-label="" value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="in progress">In progress</option>
            </select>
            <button type="submit" className={styles.search}>search</button>
        </form>
    )
}

export default Filter;