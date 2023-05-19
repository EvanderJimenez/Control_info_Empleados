import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";
import MainBodyEmployee from "../../../root/components/mainBodyEmployee/MainBodyEmployee";
import ListEmployee from "@/root/components/listEmployee/ListEmployee";

export default function index() {
  return (
    <EmployeeMain>
      <MainBodyEmployee />
    </EmployeeMain>
  );
}
