import { setCookie } from 'cookies-next';
import router from 'next/router';

interface LoginState {
  uid: string;
  jobPosition: string;
}

interface ResDepartState {
  leader: string;
}

function cookiesUser(loginState: LoginState | undefined, resDepart: ResDepartState | undefined) {

  if (loginState && resDepart) {
    const expirationDate = new Date(Date.now() + 86400 * 1000);
    let cookieValue = '';

    if (resDepart.leader !== loginState.uid) {
      cookieValue = JSON.stringify({ logged: true, type: "employee" });
      router.push("/home/EmployeeMain");
    } else if (resDepart.leader === loginState.uid) {
      cookieValue = JSON.stringify({ logged: true, type: "boss" });
      router.push("/home/BossMain");
    } else if (loginState.jobPosition === "Admin") {
      cookieValue = JSON.stringify({ logged: true, type: "admin" });
      router.push("/home/AdminMain");
    }

    setCookie("logged", cookieValue, { path: "/", expires: expirationDate });
  }
}

export default cookiesUser;
