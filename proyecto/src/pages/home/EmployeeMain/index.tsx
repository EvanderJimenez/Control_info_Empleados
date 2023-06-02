import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";

import ListEmployee from "@/root/components/listEmployee/ListEmployee";
import MainForm from "@/root/components/mainForm/MainForm";
import InformationPage from "@/root/components/informationPage/InformationPage";

export default function index() {
  return (
    <EmployeeMain>
      <InformationPage
        img="https://unsplash.com/photos/YI_9SivVt_s/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZW1wbG95ZWVzfGVzfDB8fHx8MTY4NTMwMjc1NHww&force=true"
        title="Welcome!"
        paragraph="Check your information for today"
      />
    </EmployeeMain>
  );
}
