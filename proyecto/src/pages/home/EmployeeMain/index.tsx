import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";
import MainBodyEmployee from "../../../root/components/mainBodyEmployee/MainBodyEmployee";
import ListEmployee from "@/root/components/listEmployee/ListEmployee";
import DashBoardMenu from "@/root/components/dashBoardMenu/DashBoardMenu";
import CenterMenu from "@/root/components/menus/employeeCenterMenu/EmployeeCenterMenu";

export default function index() {
  return (
    <EmployeeMain>
      <MainBodyEmployee department="" entryTime="" exitTime="" name="" />
    </EmployeeMain>
  );
}
