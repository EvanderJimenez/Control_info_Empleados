import { setCookie } from 'cookies-next';
import router from 'next/router';
import toast from 'react-hot-toast';

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

    if (loginState.jobPosition === "Admin") {
      cookieValue = JSON.stringify({ logged: true, type: "admin",user: loginState.name, department: loginState.idDepartment , uid: loginState.uid });
      router.push("/home/AdminMain");
    } else if (resDepart.idEmployee === loginState.uid) {
      cookieValue = JSON.stringify({ logged: true, type: "boss",user: loginState.name, department: loginState.idDepartment, uid: loginState.uid });
      router.push("/home/BossMain");
    } else if(resDepart.idEmployee !== loginState.uid) {
      cookieValue = JSON.stringify({ logged: true, type: "employee",user: loginState.name, department: loginState.idDepartment, uid: loginState.uid });
      router.push("/home/EmployeeMain");
    }else{
      toast.error("User not Found")
    }

    setCookie("logged", cookieValue, { path: "/", expires: expirationDate });
  }else{
    toast.error("User not Found")
  }
}


export default cookiesUser;
