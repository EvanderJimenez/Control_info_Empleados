import React, { useState } from "react";
import { Department, Employee } from "@/root/interface/departments";
import { SearchDepartment } from "../SearchDepartment";
import { FormDepartment } from "../formDepartment/FormDepartment";
import { FormDocumentEmployee } from "../formDocumentsEmployee/DocumentEmployee";
import FormEmployee from "../formEmployee/FormEmployee";
import ScrollableTable from "../../table/table";

interface RegisterProps {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGetDepartment: (id: string) => void;
  newEmployee: string;
  newEmployeeData: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
  onEditEmployee: (employeeName: string, updatedEmployee: Employee) => void;
  onDeleteEmployee: (employeeName: string) => void;
}
const SelectionOption = ({
  departmentsData,
  handleInputChange,
  handleSubmit,
  handleSubmitEmployee,
  newEmployee,
  newEmployeeData,
  setNewEmployee,
  setNewEmployeeData,
  handleGetDepartment,
  handleUpdate,
  ...props
}: RegisterProps) => {
  return (
    <div>
      <div className="relative min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
        <SearchDepartment handleGet={handleGetDepartment} />
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  py-2 px-2 pt-5 pd-5 ">
            Departments
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Work departments are a fundamental part of any organization or
            company.
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-lg:w-[100rem]">
          <div className="mt-6 bg-gray">
            <FormDepartment
              handleSubmit={handleUpdate}
              handleInputChange={handleInputChange}
              departmentsData={departmentsData}
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  py-2 px-2 pt-5 pd-5">
              Add Employees
            </h2>
            <FormEmployee
              handleSubmitEmployee={handleSubmitEmployee}
              newEmployee={newEmployee}
              newEmployeeData={newEmployeeData}
              setNewEmployee={setNewEmployee}
              setNewEmployeeData={setNewEmployeeData}
            />
            <ScrollableTable
              employeeDepa={departmentsData}
              onDeleteEmployee={props.onDeleteEmployee}
              onEditEmployee={props.onEditEmployee}
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-2 px-2 pt-5 pd-5">
              Add Document the Employee
            </h2>
            <FormDocumentEmployee />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionOption;
