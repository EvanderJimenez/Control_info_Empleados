import React, { useState, useRef, useEffect } from "react";
import { Department, Employee } from "@/root/interface/departments";
import AddEmployee from "./addEmployee/AddEmployee";
import Table from "./table/Table";
import { FormEmployee } from "./formEmployee/FormEmployee";
import { ListDepartment } from "../listDepartment/ListDeparment";
import ListEmployeeDepart from "./listEmployeeDepart/ListEmployeeDepart";
import SearchEmployeeDepart from "./SearchEmployeeDepart/SearchEmployeeDepart";

interface infoDepart {
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
  handleUpdateEmployee: (
    employeeName: string,
    updatedEmployee: Employee
  ) => void;
}
const CreationDepartment = ({
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
  handleUpdateEmployee,
  setPassIdEmployee,
  ...props
}: infoDepart) => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [clear, setClear] = useState(false);
  const [showDepartmentsForm, setShowDepartmentsForm] = useState(false);

  const handleToggleEmployeeForm = () => {
    setShowEmployeeForm(!showEmployeeForm);
  };
  const handleToggleDepartmentsForm = () => {
    setShowDepartmentsForm(!showDepartmentsForm);
  };

  return (
    <div className="bg-gray-200 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-4">
      <div className="w-1/2 flex justify-center">
      <button
        onClick={handleToggleDepartmentsForm}
        className="bg-darkBlue text-white font-bold py-2 px-4 rounded w-1/2 md:w-auto"
      >
        Show Departments
      </button>
      </div>
   
      {showDepartmentsForm && (
        <ListDepartment
          handleGetDepartment={handleGetDepartment}
          setPassId={setPassId}
        />
      )}

      <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2 px-2">
          <FormEmployee
            departmentsData={departmentsData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className="lg:w-1/3 flex flex-col md:w-1/2 px-2">
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
          <ListEmployeeDepart setPassIdEmployee={setPassIdEmployee} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 p-6">
        <button
          onClick={handleToggleEmployeeForm}
          className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
          AddEmployee
        </button>
        <form onSubmit={handleUpdate} className="w-full md:w-auto">
          <button
            className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>

      {showEmployeeForm && (
        <AddEmployee
          handleSubmitEmployee={handleSubmitEmployee}
          newEmployee={newEmployee}
          newEmployeeData={newEmployeeData}
          setNewEmployee={setNewEmployee}
          setNewEmployeeData={setNewEmployeeData}
          setNewEmployeeId={props.setNewEmployeeId}
          newEmployeeId={props.newEmployeeId}
        />
      )}

      <div className="bg-white shadow-lg rounded-lg p-8 my-4">
        <Table
          handleUpdateEmployee={handleUpdateEmployee}
          departmentsData={departmentsData}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      </div>
    </div>
  );
};

export default CreationDepartment;
