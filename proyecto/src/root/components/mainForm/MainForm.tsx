import React, { useState } from "react";
import { Login } from "../login/Login";
import { Register } from "../register/Register";

export const MainForm = ({}) => {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className="bg-PrimaryGreen primary-font w-1/2 h-full p-1">
      <a href="#" className = "secondary-font"onClick={toggleComponent}>
        {showComponent ? "¿No estás registrado?, da clic aquí." : "¿Ya tienes una cuenta?, inicia sesión aquí."}
      </a>
      <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
        {showComponent ? <Login /> : <Register />}
        <div></div>
      </div>
    </div>
  );
};

export default MainForm;
