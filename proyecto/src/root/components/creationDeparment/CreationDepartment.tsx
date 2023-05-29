import React, { useState, useRef, useEffect } from "react";
import Input, { InputDepartment } from "./input/InputDepartment";
import { Department, Employee } from "@/root/interface/departments";
import AddEmployee from "./addEmployee/AddEmployee";
import { SearchDepartment } from "./SearchDepartment";
import AddDocuments from "./addEmployee/addDocuments/AddDocuments";
import Table from "./table/Table";
import { ListDepartment } from "../listDepartment/ListDeparment";
import { FormEmployee } from "./formEmployee/FormEmployee";
interface infoDepart {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGetDepartment: (id: string) => void;
  newEmployee: string;
  setPasssId: React.Dispatch<React.SetStateAction<string>>;
  newEmployeeData: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
  newDocuments: string;
  setNewDocuments: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitDocuments: (event: React.FormEvent<HTMLFormElement>) => void;
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
  handleSubmitDocuments,
  setNewDocuments,
  newDocuments,
  ...props
}: infoDepart) => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const handleToggleEmployeeForm = () => {
    setShowEmployeeForm(!showEmployeeForm);
  };

  return (
    <div className="bg-#DDDDDD shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <ListDepartment handleGetDepartment={handleGetDepartment} />
      </div>

      <FormEmployee
        departmentsData={departmentsData}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-6">
        <div className="mt-6 max-w-md mx-auto sm:mt-0 sm:max-w-none sm:w-full sm:flex-1 sm:px-8 sm:py-4 border border-blue-500 rounded-md shadow-sm">
          <button
            onClick={handleToggleEmployeeForm}
            className="bg-black hover:bg-#9DB2BF text-white font-semibold py-2 px-4 w-full rounded-md transition duration-200 ease-in-out"
          >
            AddEmployee
          </button>
        </div>
        <form
          className="mt-6 max-w-md mx-auto sm:mt-0 sm:max-w-none sm:w-full sm:flex-1 sm:px-8 sm:py-4 border border-blue-500 rounded-md shadow-sm"
          onSubmit={handleUpdate}
        >
          <button
            className="bg-black hover:bg-#9DB2BF text-white font-semibold py-2 px-4 w-full rounded-md transition duration-200 ease-in-out"
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
          handleSubmitDocuments={handleSubmitDocuments}
          newDocuments={newDocuments}
          setNewDocuments={setNewDocuments}
        />
      )}

      <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 flex flex-col my-4">
        <Table departmentsData={departmentsData} />
      </div>
    </div>
  );
};

export default CreationDepartment;
