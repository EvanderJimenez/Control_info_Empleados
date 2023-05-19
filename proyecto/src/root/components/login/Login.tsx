import { useState, ChangeEvent, use } from "react";
import ListEmployee from "../listEmployee/ListEmployee";
import router from "next/router";
import { LoginEP, UserData } from "../../interface/employee/";
import FormLogin from "./components/FormLogin";
import { setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { StartLogin } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { RootState } from "@/root/redux/store";
import { startGetDepartmentById } from "@/root/redux/thunks/department-thunk/department.thunk";
import { selectGetDepartmentById } from "@/root/redux/selectors/department-selector/department.selector";

function Login() {
  const dispatch = useDispatch();

  const login = useSelector((state: RootState) => state.loginStore.loginUser);

  const getDepartmentById = useSelector(
    (state: RootState) => state.getDepartmentByIdStore.getDepartmentById
  );

  const loginState = useSelector(selectLogin);

  const resDepart = useSelector(selectGetDepartmentById);

  const [data, setData] = useState<LoginEP>(() => {
    return {
      email: "",
      password: "",
    };
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistrando, setIsRegistrando] = useState<boolean>(false);
  const [errorEmailPass, setErrorEmailPass] = useState<any>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngresar = async (e: any) => {
    e.preventDefault();

    if (data.email && data.password) {
      try {
        dispatch(StartLogin(data.email, data.password));
        console.log(loginState)
        if (loginState) {
          dispatch(startGetDepartmentById(loginState.idDepartment));

          console.log(resDepart);

          if (resDepart) {
            const expirationDate = new Date(Date.now() + 86400 * 1000);
            let cookieValue = "";

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

            setCookie("logged", cookieValue, {
              path: "/",
              expires: expirationDate,
            });
          } else {
          }
        } else {
          setErrorEmailPass(true);
          throw new Error("Error al iniciar sesión");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ListEmployee />
      ) : (
        <FormLogin
          handleSubmit={handleIngresar}
          handleInputChange={handleInputChange}
          loginData={data}
        />
      )}
    </>
  );
}

export default Login;
