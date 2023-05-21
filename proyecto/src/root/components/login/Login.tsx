import { useState, ChangeEvent, useEffect } from "react";
import ListEmployee from "../listEmployee/ListEmployee";
import { LoginEP } from "../../interface/employee/";
import FormLogin from "./components/FormLogin";
import { useDispatch, useSelector } from "react-redux";
import { StartLogin } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { selectGetDepartmentById } from "@/root/redux/selectors/department-selector/department.selector";
import { startGetDepartmentById } from "@/root/redux/thunks/department-thunk/department.thunk";
import cookiesUser from "@/root/utils/login/cookiesUser";

function Login() {
  const dispatch = useDispatch();

  const loginState = useSelector(selectLogin);
  const resDepart = useSelector(selectGetDepartmentById);

  const [data, setData] = useState<LoginEP>({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (loginState) {
      dispatch(startGetDepartmentById(loginState.idDepartment));
    }
  }, [loginState, dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngresar = async (e: any) => {
    e.preventDefault();

    if (data.email && data.password) {
      try {
        dispatch(StartLogin(data.email, data.password));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (loginState && resDepart) {
      cookiesUser(loginState, resDepart);
    }
  }, [loginState, resDepart]);

  useEffect(() => {
    if (loginState && resDepart) {
      setIsLoggedIn(true);
    }
  }, [loginState, resDepart]);

  return <>{isLoggedIn ? <ListEmployee /> : <FormLogin handleSubmit={handleIngresar} handleInputChange={handleInputChange} loginData={data} />}</>;
}

export default Login;
