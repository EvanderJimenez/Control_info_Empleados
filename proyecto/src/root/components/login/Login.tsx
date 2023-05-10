import { useState, ChangeEvent, use } from "react";
import Register from "../register/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import MainBoss from "../mainBoss/MainBoss";
import router from "next/router";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistrando, setIsRegistrando] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null); //usar para props de otro componente
  const [errorEmailPass, setErrorEmailPass] = useState<any>(null);
  interface Props {}

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleIngresar = async (e: any) => {
    e.preventDefault();

    let option = isRegistrando ? "register" : "login";

    if (email && password) {
      try {
        const response = await fetch("/api/empleados", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            option: "login",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserData(data);

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
        <div>   
          <form className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10" onSubmit={handleIngresar}>
            <h2 className="m-7">Login</h2>
            <div className="flex flex-col items-center justify-center p-2">
              <label>Email</label>
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
              <label>Password</label>
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
            <button type="submit" className="bg-blue hover:bg-red text-white font-bold py-2 px-4 rounded mt-4">
              Log in
            </button>
            {errorEmailPass ? <label>The employee does not exist</label> : null}
          </form>
          <button
            onClick={() => {
              setIsRegistrando(!isRegistrando);
            }}
          >
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
