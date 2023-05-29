import EmployeeMain from "@/Layout/EmployeePage";
import ReadRequestJustification from "@/root/components/employeeSection/requestVacationAndJustification/ReadRequestJustification";
import React from "react";


export default function index() {
  return (
    <EmployeeMain>
      <ReadRequestJustification/>
    </EmployeeMain>
  );
}
