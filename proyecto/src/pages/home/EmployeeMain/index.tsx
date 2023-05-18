import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";
import MainBodyEmployee from "../../../root/components/mainBodyEmployee/MainBodyEmployee";//TODO:You should use relative paths with @
import ListEmployee from "@/root/components/listEmployee/ListEmployee";
//TODO: you should use kebab-case in the name of the routes
export default function index() {
  return (
    <EmployeeMain>
      <MainBodyEmployee />
    </EmployeeMain>
  );
}
