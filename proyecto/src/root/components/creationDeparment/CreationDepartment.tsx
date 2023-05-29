import React, { useState, useRef, useEffect } from "react";
import Input, { InputDepartment } from "./input/InputDepartment";
import { Department, Employee } from "@/root/interface/departments";
import AddEmployee from "./addEmployee/AddEmployee";
import { SearchDepartment } from "./SearchDepartment";
import AddDocuments from "./addEmployee/addDocuments/AddDocuments";
import Table from "./table/Table";
interface infoDepart {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGetDepartment: (id: string) => void;
  newEmployee: string;
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
    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full">
      <div className="flex justify-center w-full">
        <section className="bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center my-2 xl:w-1/2 lg:w-1/2 w-full">
          <SearchDepartment handleGet={handleGetDepartment} />
        </section>
      </div>

      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-2 px-2 pt-5 pd-5 ">Departments</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Work departments are a fundamental part of any organization or company.</p>
          </div>
          <div className="flex justify-center mt-5 mb-6">
            <InputDepartment label="Name Department" type="name" name="name" value={departmentsData.name} id="name" onChange={handleInputChange} />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <Input label="Name Boss" type="leader" name="leader" value={departmentsData.leader} id="leader" onChange={handleInputChange} />
            <Input label="Identification Boss" type="idEmployee" name="idEmployee" value={departmentsData.idEmployee} id="idEmployee" onChange={handleInputChange} />
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <Input label="Department Belongs..." type="subDepartment" name="subDepartment" value={departmentsData.subDepartment} id="subDepartment" onChange={handleInputChange} />
            <Input label="Size of Department" type="number" name="size" value={departmentsData.size} id="size" onChange={handleInputChange} />
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <Input label=" Location " type="location" name="location" value={departmentsData.location} id="location" onChange={handleInputChange} />
            <Input label="Area  Belongs" type="level" name="level" value={departmentsData.level} id="level" onChange={handleInputChange} />
          </div>
          <div className="flex justify-center -mx-3 mb-6">
            <div className="w-full flex justify-center md:w-1/2 px-3 mb-6 md:mb-0 ">
              <button type="submit" className="bg-darkBlue hover:bg-blue-200 text-white font-bold py-2 px-4 rounded ">
                Save department
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap p-6 justify-center space-x-4">
        <button onClick={handleToggleEmployeeForm} className="bg-darkBlue hover:bg-blue-200 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out">
          AddEmployee
        </button>
        <form onSubmit={handleUpdate}>
          <button className="bg-darkBlue hover:bg-blue-200 text-white font-semibold py-2 px-4  rounded-md transition duration-200 ease-in-out" type="submit">
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
