import { useState, ChangeEvent, use } from "react";
import Register from "../registerEmployee/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import MainBoss from "../mainBoss/MainBoss";
import router from "next/router";
import { LoginEP, UserData } from "../../interface/employee/";
import FormLogin from "./components/FormLogin";



function Login() {
  const [data, setData] = useState<LoginEP>(() => {
    return {
      email: "",
      password: ""
    };
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistrando, setIsRegistrando] = useState<boolean>(false);
  const [errorEmailPass, setErrorEmailPass] = useState<any>(null);
  interface Props {}

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) =>({... prevData, [name]: value}))
  };

  const handleIngresar = async (e: any) => {
    e.preventDefault();

    console.log(JSON.stringify({data}))

    if (data.email && data.password) {
      try {
        const response = await fetch(`/api/employees/by-emailPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          const newPage = "/home/AdminMain";
          router.push(newPage);
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
        <FormLogin handleSubmit={handleIngresar} handleInputChange={handleInputChange} loginData={data}/>
      )}
    </>
  );
}

export default Login;
