import React from "react";
import BossMenu from "../bossMenu/BossMenu";
import SearchInput from "../searchInput/SearchInput";
import EditEmployeeSection from "../editEmployeeSection/EditEmployeeSection";
import Prueba from "../prueba/Prueba";

export function MainBodyBoss() {
  return (
    <>
      <SearchInput labelInputSeekerOne="email" labelInputSeekerTwo="text" placeholderSeekerOne="Enter the email to search" placeholderSeekerTwo="Enter the name to search" />
     <EditEmployeeSection/>
    </>
  );
}
