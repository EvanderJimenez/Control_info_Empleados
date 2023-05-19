import React, { useState } from "react";
import BossMenu from "../bossMenu/BossMenu";
import EditEmployeeSection from "../editEmployeeSection/EditEmployeeSection";
import EmployeeTimeSection from "../employeeTimeSection/EmployeeTimeSection";
import Register from "../registerEmployee/Register";
import ListEmployee from "../listEmployee/ListEmployee";



export function MainBodyBoss() {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };
  return (
    <>
    <div className="bg-SecondaryColor flex-col w-full h-1/3 p-1 flex justify-center items-center">
      <button className="bg-blue p-4 " onClick={toggleComponent}>
        {showComponent ? "Go to Edit Employee Information, click here" : "Go to Employee Information, click here"}
      </button>
      <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
        <div>{showComponent ? <ListEmployee /> : <Register/>}</div>
      </div>
    </div>
    </>
  );
}