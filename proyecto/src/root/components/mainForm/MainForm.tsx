import React, { useState } from "react";
import Login from "../login/Login";
import Register from "../register/Register";

export const MainForm = ({}) => {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className="bg-PrimaryGreen primary-font flex-col w-1/2 h-full p-1 flex justify-center items-center">
      <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
        <a href="#" onClick={toggleComponent}>
          {showComponent ? "¿No estás registrado?, da clic aquí." : "¿Ya tienes una cuenta?, inicia sesión aquí."}
        </a>
        {showComponent ? <Login /> : <Register />}
        <div></div>
      </div>
    </div>
  );
};

export default MainForm;
