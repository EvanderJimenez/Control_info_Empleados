import { useState, ChangeEvent, use } from "react";
import Register from "../register/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainBoss from "../mainBoss/MainBoss";
import router from "next/router";

interface Props {}

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [errorEmailPass, setErrorEmailPass] = useState<any>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const history = useHistory();
  const handleIngresar = async () => {
    const newPage = "/home/AdminMain";
    router.push(newPage);
  };

  return (
    <>
      {isLoggedIn ? (
        <ListEmployee />
      ) : (
        <form className="bg-Secondary flex items-center justify-center flex-col h-full w-full p-10" onSubmit={handleIngresar}>
          <h2 className="">Iniciar sesión</h2>
          <div className="flex flex-col items-center justify-center p-2">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <label>Contraseña</label>
            <input
              type="password"
              className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="bg-blue hover:bg-red text-white font-bold py-2 px-4 rounded mt-4" onClick={handleIngresar}>
            Ingresar
          </button>
        </form>
      )}
   </>
  );
}

export default Login;
