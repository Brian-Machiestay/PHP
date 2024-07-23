// function to delete csrf token cookie
const delCookie = (name) => {
    document.cookie = name +'=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    //console.log(ca)
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const setCookie = (cname, cvalue) => {
    document.cookie = cname + "=" + cvalue + ";";
}

//console.log(getCookie("X-CSRF-TOKEN"));

export { getCookie,setCookie }

export default delCookie;