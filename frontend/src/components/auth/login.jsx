import React from 'react';

import styles from '../../assets/styles/auth/login.module.scss';
import usernameLogo from '../../assets/images/username.svg';
import passwordLogo from '../../assets/images/password.svg';

//import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { login } from '../../state/slices/authSlice';

import $ from 'jquery';



const Login = () => {

    //const [check, setCheckedState] = useState(true)

    const auth = useSelector((state) => state.auth.contents)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    /*
    function decide (e) {
        //e.preventDefault();
        console.log(e.target.checked)
        //e.target.checked = true;
        //console.log('here')
        setCheckedState(e.target.checked);
    }
    */

    function loginUser(e) {
        e.preventDefault()
        const email = $('#email').val().trim()
        const password = $('#password').val()
        console.log(password)
        try {
            if (email.trim() === '') {
                $(`.${styles.error}`).text('invalid credentials')
                return false
            }
            else dispatch(login({email: email, password: password}));
        } catch(e) {
            console.log(e)
        }
        return false
    }

    if (auth !== '') navigate('/')

    return (
        <div className={styles.container}>
            <div className={styles.login_container}>
                <h1>Welcome to Thumbs Administration</h1>
                <form>
                    <label htmlFor='email'></label>
                    <div className={styles.detail}>
                        <img alt='email' src={usernameLogo} />
                        <input type='email' id='email' placeholder='email' name='email' />
                    </div>
                    <label htmlFor='password'></label>
                    <div className={styles.detail}>
                        <img alt='password' src={passwordLogo} />
                        <input type='password' id='password' placeholder='password' name='password' />
                    </div>
                    <div className={styles.terms}>
                        <label htmlFor='terms'>By continuing, you agree to Thumb's terms of service and acknowledge
                        that Thumb's privacy policy applies to you</label>
                    </div>
                    <button type='submit' onClick={loginUser}>Login</button>
                    <p className={styles.error}></p>
                </form>
            </div>
        </div>
    )
}

export default Login;