import React from "react";

export const Login = ({}) => {
  return (
    <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
      <div className="flex flex-col items-center justify-center p-2">
        <label htmlFor="gmail">Correo electrónico</label>
        <input type="gmail" className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red" id="gmail" />
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <label htmlFor="password">Contraseña</label>
        <input type="password" className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red" id="password" />
      </div>
    </div>
  );
};

export default Login;
