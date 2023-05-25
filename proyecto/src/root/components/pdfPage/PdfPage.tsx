import React, { useEffect } from "react";
import { FirstPagePDFInformation } from "@/root/interface/employee";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { selectGetEmployeesByIdDepartment, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetEmployeesByIdDepartment } from "@/root/redux/thunks/employee-thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import { Page, Text, Image } from "@react-pdf/renderer";
import EmployeeSummaryList from "./employeeSummaryList/EmployeeSummaryList";

export default function PdfPage() {
  let enableInput = false;

  const loginInformation = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment(loginInformation?.idDepartment || ""));
  }, []);

  interface User {
    name: string;
    firstSurname: string;
    email: string;
    cedula: number | string;
  }

  function getDataEmployee(employees: EmployeesType[]): User[] {
    const dataUser: User[] = [];

    for (const employee of employees) {
      const { name, firstSurname, email, cedula } = employee;
      dataUser.push({ name, firstSurname, email, cedula });
    }

    return dataUser;
  }
  const users = getDataEmployee(listEmployees);

  const CurrentDate: Date = new Date();
  const handleBrands = () => {};
  const handleEmployees = () => {};
  const handleJustifications = () => {};
  const CreatedPdf = () => {
    window.print();
  };

  async function createPDF(params: FirstPagePDFInformation) {}

  return (
    <>
      <section className="space-y-4 font-light text-center flex justify-center flex-col items-center">
        <div id="Front page" className="flex flex-col space-y-4">
          <div id="ButtonSection" className="flex space-x-4 fle-row items-center justify-center">
            <button className="NormalButton font-semibold print:hidden" onClick={handleBrands}>
              Brands
            </button>
            <button className="NormalButton font-semibold print:hidden" onClick={handleEmployees}>
              On department
            </button>
            <button className="EliminatedButton font-semibold print:hidden" onClick={handleEmployees}>
              Justifications
            </button>
            <button className="NormalButton font-semibold print:hidden" onClick={CreatedPdf}>
              Generated
            </button>
          </div>
          <p className="print:hidden ">Preview of pdf</p>
          <textarea className="text-center font-bold" name="Tile" id="title" cols={30} rows={5} placeholder="Title of pdf"></textarea>
          <p>Print by: {loginInformation?.name}</p>
          <p>Print Date: {CurrentDate.toUTCString()}</p>
        </div>
        <div className="flex flex-col space-y-5">
          <EmployeeSummaryList users={users} department={loginInformation?.name} />
        </div>
      </section>
    </>
  );
}
