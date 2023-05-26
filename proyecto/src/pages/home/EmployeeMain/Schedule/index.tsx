import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";

import ListEmployee from "@/root/components/listEmployee/ListEmployee";
import DashBoardMenu from "@/root/components/menus/dashBoardMenu/DashBoardMenu";
import CenterMenu from "@/root/components/menus/employeeCenterMenu/EmployeeCenterMenu";
import EmployeeTableViewSchedule from "@/root/components/employeeTablewViewSchedule/EmployeeTableViewSchedule";
import ReadOnlyScheduleEmployee from "@/root/components/employeeSection/readOnlyScheduleEmployee/ReadOnlyScheduleEmployee";

export default function index() {
  return (
    <EmployeeMain>
      <ReadOnlyScheduleEmployee />
    </EmployeeMain>
  );
}
