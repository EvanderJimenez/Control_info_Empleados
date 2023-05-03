import { useState, ChangeEvent } from "react";
import Register from "../register/Register";
import ListEmployee from "../listEmployee/ListEmployee";

interface Props {
  // Define aquí las props necesarias
}

function Login () {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null); //usar para props de otro componente
  const [errorEmailPass, setErrorEmailPass] = useState<any>(null)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleIngresar = async () => {
    if (email && password) {
      try {
        console.log("Datos enviados:", { email, password })
        // Enviar la solicitud de inicio de sesión
        const response = await fetch('/api/empleados',{
          method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        contrasena: password
      })
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserData(data);
          console.log(data);
        } else {
          setErrorEmailPass(true)
          throw new Error('Error al iniciar sesión');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {!isLoggedIn ? (<ListEmployee />) : (    <form className="bg-secondary flex items-center justify-center flex-col h-full w-full p-10" onSubmit={handleIngresar}>
      <h2 className="m-7">Iniciar sesión</h2>
      <div className="flex flex-col items-center justify-center p-2">
        <label >Correo electrónico</label>
        <input
          type="email"
          className="bg-primary secondary-font border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red rounded-md py-2 px-4 w-full"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <label >Contraseña</label>
        <input
          type="password"
          className="bg-primary secondary-font border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red rounded-md py-2 px-4 w-full"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="bg-blue hover:bg-red text-white font-bold py-2 px-4 rounded mt-4">Ingresar</button>
      {errorEmailPass ? <label>The employee does not exist</label> : null}
    </form>)}
    </div>

  );
};

export default Login;
