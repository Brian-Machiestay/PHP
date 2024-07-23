import axios from 'axios';
import { getCookie } from './cookie';

const Axios = axios.create({
    headers: {"X-CSRF-TOKEN": getCookie("X-CSRF-TOKEN")},
    withCredentials: true,
    baseURL: 'https://volunteers.devatop.org/api/v1',
});

Axios.interceptors.request.use(
    config => {
        //console.log('the interceptor was called');
        const token = getCookie("X-CSRF-TOKEN");
        config.headers["X-CSRF-TOKEN"] = token;
        return config;
    },
    error => Promise.reject(error)
);

/*
Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        window.location.href = '/admin/login';
      }
    });
    */

//console.log('Axios instance was called')
//console.log(getCookie("X-CSRF-TOKEN"))
export default Axios;