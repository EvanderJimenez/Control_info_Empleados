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
    <EditEmployeeSection />
    </>
  );
}