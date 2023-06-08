import React, { useState } from "react";
import { ListDepartment } from "../../listDepartment/ListDeparment";
import AddEmployee from "../addEmployee/AddEmployee";
import { FormEmployee } from "../formEmployee/FormEmployee";
import Table from "../table/Table";
import { Department, Employee } from "@/root/interface/departments";
import SearchEmployeeDepart from "../SearchEmployeeDepart/SearchEmployeeDepart";
import ListEmployeeDepart from "../listEmployeeDepart/ListEmployeeDepart";

interface methods {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGetDepartment: (id: string) => void;
  newEmployee: string;
  newEmployeeId: string;
  newEmployeeData: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setPassId: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeId: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteEmployee: (employeeName: string | number) => void;
  setPassIdEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNameDepart: React.Dispatch<React.SetStateAction<string>>;
  setIdNameEmployee: React.Dispatch<React.SetStateAction<string>>;
  handleUpdateEmployee: (
    employeeName: string,
    updatedEmployee: Employee
  ) => void;
}

export default function TabsDepartments({
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
  setPassId,
  handleDeleteEmployee,
  setPassIdEmployee,
  handleUpdateEmployee,
  setIdNameEmployee,
  setNameDepart,
  ...props
}: methods) {
  const [activeTab, setActiveTab] = useState("ListDepartment");
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");

  return (
    <div className="flex flex-col min-h-screen h-auto w-auto">
      <div className="w-full h-full">
        <section className="flex flex-wrap" role="tablist">
        <div className="mr-2" role="presentation">
            <button
              className={`bg-blue inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                activeTab === "ListDepartment" ? "active" : ""
              }`}
              id="ListDepartment-tab"
              type="button"
              role="tab"
              onClick={() => setActiveTab("ListDepartment")}
            >
              List Department
            </button>
          </div>
          <div className="mr-2" role="presentation">
            <button
              className={`bg-blue inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                activeTab === "FormDepartment" ? "active" : ""
              }`}
              id="FormDepartment-tab"
              type="button"
              role="tab"
              onClick={() => setActiveTab("FormDepartment")}
            >
              Form Department
            </button>
          </div>
          <div className="mr-2" role="presentation">
            <button
              className={`bg-blue inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                activeTab === "ListEmployee" ? "active" : ""
              }`}
              id="ListEmployee-tab"
              type="button"
              role="tab"
              onClick={() => setActiveTab("ListEmployee")}
            >
              List Employee
            </button>
          </div>
          <div className="mr-2" role="presentation">
            <button
              className={` bg-blue inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                activeTab === "EditEmployee" ? "active" : ""
              }`}
              id="EditEmployee-tab"
              type="button"
              role="tab"
              onClick={() => setActiveTab("EditEmployee")}
            >
              Employees department
            </button>
          </div>
        </section>
        {activeTab === "FormDepartment" && (
          <FormEmployee
            departmentsData={departmentsData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
          />
        )}
        {activeTab === "ListEmployee" && (
          <>
            <div className="w-full h-full">
              <SearchEmployeeDepart
                labelInputSeekerOne="text"
                valueEnd={cedula}
                placeholderSeekerOne="Cedula"
                typeList="cedula"
                id="cedula"
              />
              <SearchEmployeeDepart
                labelInputSeekerOne="text"
                valueEnd={name}
                placeholderSeekerOne="Name"
                typeList="name"
                id="name"
              />
              <SearchEmployeeDepart
                labelInputSeekerOne="text"
                valueEnd={jobPosition}
                placeholderSeekerOne="Job Position"
                typeList="jobPosition"
                id="jobPosition"
              />
{/*               <ListEmployeeDepart
                setPassIdEmployee={setPassIdEmployee}
                setIdNameEmployee={setIdNameEmployee}
              /> */}
            </div>
          </>
        )}
        {activeTab === "ListDepartment" && (
          <>
            <div className="w-full h-full">
              <ListDepartment
                handleGetDepartment={handleGetDepartment}
                setPassId={setPassId}
                setNameDepart={setNameDepart}
              />
            </div>
          </>
        )}
        {activeTab === "EditEmployee" && (
          <Table
            handleUpdateEmployee={handleUpdateEmployee}
            departmentsData={departmentsData}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        )}
      </div>
    </div>
  );
}
