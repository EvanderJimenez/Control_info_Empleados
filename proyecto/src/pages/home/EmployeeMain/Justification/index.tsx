import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";
import RequestVacationAndJustification from "@/root/components/employeeSection/requestVacationAndJustification/RequestVacationAndJustification";

export default function index() {
  return (
    <EmployeeMain>
      <RequestVacationAndJustification/>
    </EmployeeMain>
  );
}
