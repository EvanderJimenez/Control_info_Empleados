import React, { useEffect, useState } from "react";
import { FirstPagePDFInformation } from "@/root/interface/employee";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetEmployeesByIdDepartment,
  selectLogin,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetEmployeesByIdDepartment } from "@/root/redux/thunks/employee-thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import EmployeeSummaryList from "./employeeSummaryList/EmployeeSummaryList";
import TableView from "./employeeSummaryList/tableView/table/Table";

export default function PdfPage() {
  const loginInformation = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const CurrentDate: Date = new Date();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      StarGetEmployeesByIdDepartment(loginInformation?.idDepartment || "")
    );
  }, []);

  interface User {
    name: string;
    firstSurname: string;
    email: string;
    cedula: number | string;
  }

  const rows = [
    { column1: "Dato 1", column2: "Dato 2", column3: "Dato 3" },
    { column1: "Dato 4", column2: "Dato 5", column3: "Dato 6" },
    { column1: "Dato 7", column2: "Dato 8", column3: "Dato 9" },
  ];
  interface row {
    column1: string;
    column2: string;
    column3: string;
  }
  interface rows {
    rows: row[];
  }

  const columnTitles = ["Date-brand", "Check-in time", "Check-out time"];
  const [showComponent, setShowComponent] = useState("Employee");

  const toggleComponentJustification = () => {
    setShowComponent("JustificationBody");
  };
  const toggleComponentBrands = () => {
    setShowComponent("BrandBody");
  };
  const toggleComponentEmployee = () => {
    setShowComponent("EmployeeBody");
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
  };
  const handleEmployees = () => {
    toggleComponentEmployee();
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
      <section className="space-y-4 font-light text-center flex justify-center flex-col items-center">
        <div
          id="Front page"
          className="flex flex-col space-y-4 justify-center items-center"
        >
          <div
            id="ButtonSection"
            className="flex space-x-4 fle-row items-center justify-center"
          >
            <button
              className="NormalButton font-semibold print:hidden"
              onClick={handleBrands}
            >
              Brands
            </button>
            <button
              className="NormalButton font-semibold print:hidden"
              onClick={handleEmployees}
            >
              On department
            </button>
            <button
              className="NormalButton font-semibold print:hidden"
              onClick={CreatedPdf}
            >
              Generated
            </button>
          </div>
          <p className="print:hidden ">Preview of pdf</p>
          <textarea
            className="text-center font-bold"
            name="Tile"
            id="title"
            cols={30}
            rows={5}
            placeholder="Title of pdf"
          ></textarea>
          <p>Print by: {loginInformation?.name}</p>
          <p>Print Date: {CurrentDate.toUTCString()}</p>
        </div>
        <div
          id="body"
          className="flex justify-center items-center space-y-5 w-full"
        >
          {showComponent === "EmployeeBody" && (
            <EmployeeSummaryList
              users={users}
              department={loginInformation?.name}
            />
          )}
          {showComponent === "BrandBody" && (
            <TableView columnTitles={columnTitles} rows={rows} />
          )}
          {showComponent === "JustificationBody" && <div> Adios</div>}
        </div>
      </section>
    </>
  );
}
