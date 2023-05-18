import React, { useState } from "react";
import Login from "../login/Login";
import Register from "../registerEmployee/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import { Top } from "../top/Top";
import { Foot } from "../foot/Foot";

export const MainForm = ({}) => {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className="bg-SecondaryColor flex-col w-full h-1/3 p-1 flex justify-center items-center">
      <a className="bg-SecondaryColor" href="#" onClick={toggleComponent}>{/* TODO: Do not use a in Next.js */}
        {showComponent ? "Don't have an account?, register" : "Do you have an account?, log in"}
      </a>
      <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
        <div>{showComponent ? <Login /> : <Register user={undefined} onCancel={() => console.log("Cancel")} />}</div>
      </div>
    </div>
  );
};

export default MainForm;
