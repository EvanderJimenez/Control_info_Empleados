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
import { RootState } from "@/root/redux/store";
import LoadingGeneralComponent from "../loadingGeneralComponent/LoadingGeneralComponent";
import toast from "react-hot-toast";
import { EmployeesType } from "@/root/types/Employee.type";
import { connectStorageEmulator } from "firebase/storage";

function Login() {
  const dispatch = useDispatch();

  const loginState = useSelector(selectLogin);

  const resDepart = useSelector(selectGetDepartmentById);
  const loading = useSelector((state: RootState) => state.loading.loading);
  /*localStorage.setItem("loginState", JSON.stringify(loginState));

  const loginStateStored = localStorage.getItem("loginState");
  let loginState2: EmployeesType | null = null;

  if (loginStateStored) {
    try {
      loginState2 = JSON.parse(loginStateStored);
    } catch (error) {
      console.error("Error al analizar el valor almacenado en localStorage:", error);
    }
  }*/

  const [data, setData] = useState<LoginEP>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginState) {
      dispatch(startGetDepartmentById(loginState.idDepartment));
    }
  }, [loginState, dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (data.email && data.password) {
      try {
        dispatch(StartLogin(data.email, data.password));
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (loginState && resDepart) {
      cookiesUser(loginState, resDepart);
    }
  }, [loginState, resDepart]);

  return (
    <>
      <div className="flex justify-center">{loading ? <LoadingGeneralComponent /> : <div className="font-medium text-white">Welcome!</div>}</div>
      <FormLogin handleSubmit={handleLogin} handleInputChange={handleInputChange} loginData={data} />
    </>
  );
}

export default Login;
