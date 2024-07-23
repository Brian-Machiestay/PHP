import React from "react";
import search from "../../assets/images/search.svg";
import styles from "../../assets/styles/reusableStyles/search.module.scss"

const Search = () => {
    
    const searchVolunteer = () => {
        console.log('search volunteer')
    }

    return (
        <div className={styles.container}>
            <img src={search} alt="search" />
            <label htmlFor="search"></label>
            <input type="text" name="search" placeholder="search task title here" onChange={searchVolunteer} />
        </div>
    )
}

export default Search;