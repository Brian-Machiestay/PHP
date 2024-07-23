import React from "react";
import { Link } from "react-router-dom";

import img from '../../assets/images/logout.svg';
import { logout } from "../../state/slices/authSlice";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const destroySession = useSelector((state) => state.auth.logout)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logoutUser() {
        dispatch(logout())
    }

    if (destroySession == null || destroySession !== '') {
        navigate('/login')
    }

    return (
        <Link onClick={logoutUser}><img src={img} alt="logout" />Logout</Link>
    )
}

export default Logout;