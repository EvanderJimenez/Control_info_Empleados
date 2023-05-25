import React, { useEffect } from "react";
import SearchInput from "../searchInput/SearchInput";
import EmployeeSummaryList from "./employeeSummaryList/EmployeeSummaryList";
import { FirstPagePDFInformation } from "@/root/interface/employee";
import PDFDocument from "pdfkit";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { selectGetEmployeesByIdDepartment, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";

export default function PdfPage() {
  let enableInput = false;
  const loginInformation = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const dispatch = useDispatch();
  const handleBrands = () => {};
  const handleJustifications = () => {};

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment(loginInformation?.idDepartment || ""));
  }, []);

  const CreatedPdf = () => {
    const doc = new jsPDF();
    generatePDF();
  };

  function generatePDF() {
    const doc = new jsPDF();

    doc.save("mi-archivo.pdf");
  }

  async function createPDF(params: FirstPagePDFInformation) {}

  return (
    <>
      <div className="flex flex-wrap h-screen bg-white">
        <div className="lg:w-1/4 print:hidden justify-between flex items-center flex-col space-y-4">
          <div className="flex flex-col space-y-2 justify-center items-center">
            <button className="bg-blue  w-full" onClick={handleBrands}>
              Brands
            </button>
            <button className="bg-blue w-full" onClick={handleBrands}>
              Justifications
            </button>
          </div>
          <input
            type="text"
            id="nameEmployee"
            className="block p-2.5 w-full z-20 text-black text-sm rounded-l-sm rounded-r-sm  border-l-1 border  focus:ring-blue focus:border-blue "
            placeholder="Name on list"
            required
          />
          <div className="pb-2 border h-full w-full"></div>
        </div>
        <section className="lg:w-3/4 space-y-5 flex flex-col justify-center items-center">
          <label htmlFor="namePDF">Name of report:</label>
          <input type="text" placeholder="Name" id="name" />
          <label htmlFor="title">Title of report</label>
          <textarea name="Title" id="title" cols={30} rows={10}></textarea>
          <button className="bg-blue w-auto" onClick={CreatedPdf}>
            Download
          </button>
        </section>
      </div>
    </>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
