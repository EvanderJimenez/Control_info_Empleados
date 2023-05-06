import React, { useState } from "react";
import Register from "../register/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import Login from "../login/Login"

export const MainForm = ({}) => {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className="bg-PrimaryGreen flex-col w-full h-full flex justify-center items-center">
      <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
        <a href="#" onClick={toggleComponent}>
          {showComponent ? "¿No estás registrado?, da clic aquí." : "¿Ya tienes una cuenta?, inicia sesión aquí."}
        </a>
        {showComponent ? <Login /> : <ListEmployee/>}
        <div></div>
      </div>
    </div>
  );
};

export default MainForm;
