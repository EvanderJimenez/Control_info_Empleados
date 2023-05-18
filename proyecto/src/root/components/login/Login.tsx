import { useState, ChangeEvent, use } from "react";
import Register from "../registerEmployee/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import MainBoss from "../mainBoss/MainBoss";
import router from "next/router";
import { LoginEP, UserData } from "../../interface/employee/";//TODO:You should use relative paths with @
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
      try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
        const response = await fetch(`/api/employees/by-emailPassword`, {// You must not fetch in components
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

          const resDepart = await fetch(`/api/departments/${dataEmplo.idDepartment}`, {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (resDepart.ok) {
            const dataDepartment = await resDepart.json();

            const expirationDate = new Date(Date.now() + 86400 * 1000);

            if (dataDepartment.leader !== dataEmplo.uid) {
              const cookieValue = JSON.stringify({
                logged: true,
                type: "employee",
              });

              setCookie("logged", cookieValue, {
                path: "/",
                expires: expirationDate,
              });

              router.push("/home/EmployeeMain");
            } else if (dataDepartment.leader === dataEmplo.uid) {
              const cookieValue = JSON.stringify({
                logged: true,
                type: "boss",
              });

              setCookie("logged", cookieValue, {
                path: "/",
                expires: expirationDate,
              });
              router.push("/home/BossMain");
            } else if (dataEmplo.jobPosition === "Admin") {//TODO: You should not use else or simplify the complex with reverse if
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
          } else {//TODO: You should not use else or simplify the complex with reverse if
          }
        } else {//TODO: You should not use else or simplify the complex with reverse if
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
