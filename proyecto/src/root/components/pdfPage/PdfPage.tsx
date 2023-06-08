import React, { useEffect, useState } from "react";
import { FirstPagePDFInformation } from "@/root/interface/employee";
import { useDispatch, useSelector } from "react-redux";
import { selectGetEmployeesByIdDepartment, selectGetEmployeesByIdDepartmentJustifications, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetEmployeesByIdDepartment, StarGetEmployeesByIdDepartmentJustifications } from "@/root/redux/thunks/employee-thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import EmployeeSummaryList from "./employeeSummaryList/EmployeeSummaryList";
import TableView from "./employeeSummaryList/tableView/table/Table";
import { getDepartmentByDocIdReducer } from "@/root/redux/reducers/department-reducer/getDepartmentByDocId/GetDepartmentByDocIdReducer";
import { selectGetByIdDocDepartment } from "@/root/redux";

export default function PdfPage() {
  const loginInformation = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartmentJustifications);
  const CurrentDate: Date = new Date();
  const dispatch = useDispatch();

  const department = useSelector(selectGetByIdDocDepartment);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartmentJustifications(loginInformation?.idDepartment || ""));
  }, []);

  interface User {
    name: string;
    firstSurname: string;
    email: string;
    cedula: number | string;
  }
  interface AttendanceMap {
    justificationInit: string;
    justificationFin: string;
  }

  interface employee {
    name: string;
    attendance: Map<string, AttendanceMap>;
  }

  function extractInformationEmployeesJustifications(employees: EmployeesType[]): Array<{ column1: string; column2: string; column3: string; column4: string }> {
    let result: { column1: string; column2: string; column3: string; column4: string }[] = [];

    employees.forEach((employee) => {
      Object.entries(employee.attendance).forEach(([key, value]) => {
        result.push({
          column1: employee.name,
          column2: key,
          column3: value.justificationIni,
          column4: value.justificationFin,
        });
      });
    });

    return result;
  }

  const attendance = extractInformationEmployeesJustifications(listEmployees);

  interface row {
    column1: string;
    column2: string;
    column3: string;
  }
  interface rows {
    rows: row[];
  }

  const columnTitles = ["Name of employee", "Date justification", "justification for late arrival", "justification for early dismissal"];
  const [showComponent, setShowComponent] = useState("Employee");
  let [filter, setFilter] = useState("none");

  const toggleComponentJustification = () => {
    setShowComponent("JustificationBody");
    setFilter("Justifications of employees in this department");
  };
  const toggleComponentBrands = () => {
    setShowComponent("BrandBody");
  };
  const toggleComponentEmployee = () => {
    setShowComponent("EmployeeBody");
    setFilter("employees in this department");
  };

  function getDataEmployee(employees: EmployeesType[]): User[] {
    const dataUser: User[] = [];

    for (const employee of employees) {
      const { name, firstSurname, email, cedula } = employee;
      dataUser.push({ name, firstSurname, email, cedula });
    }

    return dataUser;
  }

  const users = getDataEmployee(listEmployees);

  const handleBrands = () => {
    toggleComponentBrands();
    filter = "brands of employee in department";
  };
  const handleEmployees = () => {
    toggleComponentEmployee();
    filter = "employees in this department";
  };
  const handleJustifications = () => {
    toggleComponentJustification();
  };
  const CreatedPdf = () => {
    window.print();
  };

  const handleGetBrands = async (idEmployee: string | undefined) => {
    try {
      const response = await fetch(`/api/brands/${idEmployee}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {}
  };

  return (
    <>
      <section className="space-y-5 pb-14 pt-2 font-light text-center flex justify-center flex-col items-center">
        <div id="Front page" className="flex flex-col space-y-4 justify-center items-center">
          <div id="ButtonSection" className="flex space-x-4 fle-row items-center justify-center">
            <button className="bg-darkBlue font-semibold print:hidden" onClick={handleJustifications}>
              Justifications of employees
            </button>
            <button className="bg-darkBlue font-semibold print:hidden" onClick={handleEmployees}>
              On department
            </button>
            <button className="bg-pink font-semibold print:hidden" onClick={CreatedPdf}>
              Generated
            </button>
          </div>
          <p className="print:hidden font-semibold ">Preview of pdf</p>
          <textarea className="text-center font-bold" name="Tile" id="title" cols={30} rows={5} placeholder="Title of pdf"></textarea>
          <p className="text-center">Print by: {loginInformation?.name}</p>
          <p className="text-center">Print date: {CurrentDate.toUTCString()}</p>
          <p className="text-center">Filter by: {filter}</p>
          <p className="text-center">Department: {department?.name}</p>
        </div>
        <div id="body" className=" print:w-full print:max-w-full flex justify-center items-center space-y-5 w-1/2">
          {showComponent === "EmployeeBody" && <EmployeeSummaryList users={users} department={loginInformation?.name} />}
          {showComponent === "JustificationBody" && <TableView columnTitles={columnTitles} rows={attendance} />}
        </div>
      </section>
    </>
  );
}
