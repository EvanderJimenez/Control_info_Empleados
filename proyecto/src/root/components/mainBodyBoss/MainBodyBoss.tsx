import React from "react";
import BossMenu from "../bossMenu/BossMenu";
import SearchInput from "../searchInput/SearchInput";
import EditEmployeeSection from "../editEmployeeSection/EditEmployeeSection";

export function MainBodyBoss() {
  return (
    <>
      <SearchInput labelInputSeekerOne="localData-time" labelInputSeekerTwo="text" placeholderSeekerOne="Enter the email to search" placeholderSeekerTwo="Enter the name to search" />
      <EditEmployeeSection />
    </>
  );
}
