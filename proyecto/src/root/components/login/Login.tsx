import { useState, ChangeEvent, use } from "react";
import Register from "../registerEmployee/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import MainBoss from "../mainBoss/MainBoss";
import router from "next/router";
import { LoginEP, UserData } from "../../interface/employee/";
import FormLogin from "./components/FormLogin";
import { setCookie } from "cookies-next";

function Login() {
  const [data, setData] = useState<LoginEP>(() => {
    return {
      email: "",
      password: "",
    };
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistrando, setIsRegistrando] = useState<boolean>(false);
  const [errorEmailPass, setErrorEmailPass] = useState<any>(null);
  interface Props {}

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngresar = async (e: any) => {
    e.preventDefault();

    if (data.email && data.password) {
      try {
        const response = await fetch(`/api/employees/by-emailPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        if (response.ok) {
          const dataEmplo = await response.json();
          console.log("Job Position: " + dataEmplo.idDepartment);

          const resDepart = await fetch(`/api/departments/${dataEmplo.idDepartment}`, {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (resDepart.ok) {
            const dataDepartment = await resDepart.json();

            console.log(dataDepartment);
  
  
            if ((dataDepartment.leader !== dataEmplo.uid)) {

              const expirationDate = new Date(Date.now() + 86400 * 1000);

              const cookieValue = JSON.stringify({
                logged: true,
                type: 'employee'
              });
              
              setCookie('logged', cookieValue, {
                path: '/',
                expires: expirationDate
              });

              router.push("/home/EmployeeMain");
            } else if ((dataDepartment.leader === dataEmplo.uid)) {
              //setIsLoggedIn(true);

            } else if (dataEmplo.jobPosition === "Admin") {
              //setIsLoggedIn(true);

              router.push("/home/AdminMain");
            }
          } else {
            console.log(dataEmplo.idDepartment);
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

  return <>{isLoggedIn ? <ListEmployee /> : <FormLogin handleSubmit={handleIngresar} handleInputChange={handleInputChange} loginData={data} />}</>;
}

export default Login;
