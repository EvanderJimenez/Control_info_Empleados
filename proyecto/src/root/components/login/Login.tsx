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

function Login() {
  const dispatch = useDispatch();

  const loginState = useSelector(selectLogin);
  const resDepart = useSelector(selectGetDepartmentById);
  const loading = useSelector((state: RootState) => state.loading.loading);

  const [data, setData] = useState<LoginEP>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginState) {
      dispatch(startGetDepartmentById(loginState.idDepartment));
      console.log("id deparmen")
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
      } catch (error) {
        //error
      }
    }
  };

  useEffect(() => {
    if (loginState && resDepart) {
      cookiesUser(loginState, resDepart);
    }
  }, [loginState, resDepart]);

  return (
    <>
      <div>{loading ? <LoadingGeneralComponent /> : <FormLogin handleSubmit={handleLogin} handleInputChange={handleInputChange} loginData={data} />}</div>
    </>
  );
}

export default Login;
