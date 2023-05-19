
import { selectGetDepartmentById } from '@/root/redux/selectors/department-selector/department.selector';
import { selectLogin } from '@/root/redux/selectors/employee-selector/employee.selector';
import { setCookie } from 'cookies-next';
import router from 'next/router';
import { useSelector } from 'react-redux';

function cookiesUser(){

    const loginState = useSelector(selectLogin);

    const resDepart = useSelector(selectGetDepartmentById);

    if((loginState && resDepart)){
        const expirationDate = new Date(Date.now() + 86400 * 1000);


        if (resDepart.leader !== loginState.uid) {
          const cookieValue = JSON.stringify({
            logged: true,
            type: "employee",
          });

          setCookie("logged", cookieValue, {
            path: "/",
            expires: expirationDate,
          });

          router.push("/home/EmployeeMain");
        } else if (resDepart.leader === loginState.uid) {
          const cookieValue = JSON.stringify({
            logged: true,
            type: "boss",
          });

          setCookie("logged", cookieValue, {
            path: "/",
            expires: expirationDate,
          });
          router.push("/home/BossMain");
        } else if (loginState.jobPosition === "Admin") {
          const cookieValue = JSON.stringify({
            logged: true,
            type: "admin",
          });

          setCookie("logged", cookieValue, {
            path: "/",
            expires: expirationDate,
          });
          router.push("/home/AdminMain");
        }
    }

}


export default cookiesUser