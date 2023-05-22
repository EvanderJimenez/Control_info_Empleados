import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";

import ListEmployee from "@/root/components/listEmployee/ListEmployee";
import DashBoardMenu from "@/root/components/dashBoardMenu/DashBoardMenu";
import CenterMenu from "@/root/components/menus/employeeCenterMenu/EmployeeCenterMenu";
import EmployeeTableViewSchedule from "@/root/components/employeeTablewViewSchedule/EmployeeTableViewSchedule";
import ReadOnlyScheduleEmployee from "@/root/components/readOnlyScheduleEmployee/ReadOnlyScheduleEmployee";

const rows = [
  { name: "Evander Jiménez", cedula: 208170802, entryTime: "03:00", exitTime: "04:00" },
  { name: "Dario Mora", cedula: 109090090, entryTime: "03:00", exitTime: "04:00" },
  { name: "José Vargas", cedula: 509987123, entryTime: "03:00", exitTime: "04:00" },
  { name: "José Dario", cedula: 208170802, entryTime: "03:00", exitTime: "04:00" },
  { name: "Dario José", cedula: 109090090, entryTime: "03:00", exitTime: "04:00" },
];

export default function index() {
  return (
    <EmployeeMain>
        <ReadOnlyScheduleEmployee />
    </EmployeeMain>
  );
}
