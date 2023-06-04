import React, { useState, useRef, useEffect } from "react";
import Input, { InputDepartment } from "./input/InputDepartment";
import { Department, Employee } from "@/root/interface/departments";
import AddEmployee from "./addEmployee/AddEmployee";
import Table from "./table/Table";
import { FormEmployee } from "./formEmployee/FormEmployee";
import { ListDepartment } from "../listDepartment/ListDeparment";

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
  ...props
}: infoDepart) => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const handleToggleEmployeeForm = () => {
    setShowEmployeeForm(!showEmployeeForm);
  };

  return (
    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full">
      <section className="bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center my-2   w-full">
        <ListDepartment
          handleGetDepartment={handleGetDepartment}
          setPassId={setPassId}
        />
      </section>

      <FormEmployee
        departmentsData={departmentsData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <div className="flex flex-wrap p-6 justify-center space-x-4">
        <button
          onClick={handleToggleEmployeeForm}
          className="bg-darkBlue hover:bg-blue-200 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
        >
          AddEmployee
        </button>
        <form onSubmit={handleUpdate}>
          <button
            className="bg-darkBlue hover:bg-blue-200 text-white font-semibold py-2 px-4  rounded-md transition duration-200 ease-in-out"
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

      <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 flex flex-col my-4">
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
