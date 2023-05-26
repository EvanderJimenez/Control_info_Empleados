import { setCookie } from 'cookies-next';
import router from 'next/router';

interface LoginState {
  uid: string;
  jobPosition: string;
  name: string;
  idDepartment: string;
}

interface ResDepartState {
  idEmployee: string;
}

function cookiesUser(loginState: LoginState | undefined, resDepart: ResDepartState | undefined) {

  if (loginState && resDepart) {
    const expirationDate = new Date(Date.now() + 86400 * 1000);
    let cookieValue = '';

    if (resDepart.idEmployee !== loginState.uid && loginState.jobPosition !== "Admin") {
      cookieValue = JSON.stringify({ logged: true, type: "employee",user: loginState.name, department: loginState.idDepartment, uid: loginState.uid });
      router.push("/home/EmployeeMain");
    } else if (resDepart.idEmployee === loginState.uid) {
      cookieValue = JSON.stringify({ logged: true, type: "boss",user: loginState.name, department: loginState.idDepartment, uid: loginState.uid });
      router.push("/home/BossMain");
    } else if (loginState.jobPosition === "Admin") {
      cookieValue = JSON.stringify({ logged: true, type: "admin",user: loginState.name, department: loginState.idDepartment , uid: loginState.uid });
      router.push("/home/AdminMain");
    }

    setCookie("logged", cookieValue, { path: "/", expires: expirationDate });
  }
}

export default cookiesUser;
