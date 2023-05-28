import React, { useState, useRef, useEffect } from "react";
import Input, { InputDepartment } from "./input/InputDepartment";
import { Department, Employee } from "@/root/interface/departments";
import AddEmployee from "./addEmployee/AddEmployee";
import { SearchDepartment } from "./SearchDepartment";
import AddDocuments from "./addEmployee/addDocuments/AddDocuments";
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
  const [showDocumentsForm, setShowDocumentsForm] = useState(false);
  const employeeFormRef = useRef(null);

  const handleToggleEmployeeForm = () => {
    setShowEmployeeForm(!showEmployeeForm);
  };

  const handleToggleDocumentsForm = () => {
    setShowDocumentsForm(!showDocumentsForm);
  };

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="bg-[#049473] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <SearchDepartment handleGet={handleGetDepartment} />
      </div>

      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  py-2 px-2 pt-5 pd-5 ">
              Departments
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Work departments are a fundamental part of any organization or
              company.
            </p>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <InputDepartment
              label={"Name Department"}
              type={"name"}
              name={"name"}
              value={departmentsData.name}
              id={"name"}
              onChange={handleInputChange}
            />
          </div>
          <div className="-mx-3 md:flex mb-6">
            <Input
              label={"Name Boss"}
              type={"leader"}
              name={"leader"}
              value={departmentsData.leader}
              id={"leader"}
              onChange={handleInputChange}
            />
            <Input
              label={"Identification Boss"}
              type={"idEmployee"}
              name={"idEmployee"}
              value={departmentsData.idEmployee}
              id={"idEmployee"}
              onChange={handleInputChange}
            />
          </div>
          <div className="-mx-3 md:flex mb-2">
            <Input
              label={"Department Belongs..."}
              type={"subDepartment"}
              name={"subDepartment"}
              value={departmentsData.subDepartment}
              id={"subDepartment"}
              onChange={handleInputChange}
            />
            <Input
              label={"Size of Department"}
              type={"number"}
              name={"size"}
              value={departmentsData.size}
              id={"size"}
              onChange={handleInputChange}
            />
          </div>
          <div className="-mx-3 md:flex mb-2">
            <Input
              label={" Location "}
              type={"location"}
              name={"location"}
              value={departmentsData.location}
              id={"location"}
              onChange={handleInputChange}
            />
            <Input
              label={"Area  Belongs"}
              type={"level"}
              name={"level"}
              value={departmentsData.level}
              id={"level"}
              onChange={handleInputChange}
            />
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0 px-10">
              <button
                type="submit"
                className="bg-[#049473] hover:bg-sky text-white font-bold py-2 px-4 rounded "
              >
                Save Department
              </button>
            </div>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0 px-10">
              <button
                onClick={handleToggleEmployeeForm}
                className="bg-[#049473] hover:bg-sky text-white font-bold py-2 px-4 rounded "
              >
                AddEmployee
              </button>
            </div>
          </div>
        </div>
      </form>
      {showEmployeeForm && (
        <AddEmployee
          formRef={formRef}
          handleSubmitEmployee={handleSubmitEmployee}
          newEmployee={newEmployee}
          newEmployeeData={newEmployeeData}
          setNewEmployee={setNewEmployee}
          setNewEmployeeData={setNewEmployeeData}
          handleToggleDocumentsForm={handleToggleDocumentsForm}
        />
      )}
      {showDocumentsForm && (
        <AddDocuments
          handleSubmitDocuments={handleSubmitDocuments}
          newDocuments={newDocuments}
          setNewDocuments={setNewDocuments}
        />
      )}
      <div>
        <table className="border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Personal Information
              </th>
              <th className="border border-gray-300 px-4 py-2">Documents</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(departmentsData.employees).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-300 px-4 py-2">{key}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    name={`des-${key}`}
                    value={value.des}
                    onChange={handleInputChange}
                    placeholder="Personal Information"
                    className="border rounded-md px-3 py-2"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {Object.entries(value.documents).map(([docKey, docValue]) => (
                    <div key={docKey}>
                      <p>Nombre del Documento: {docKey}</p>
                      <p>Tipo de Documento: {docValue.type}</p>
                      <p>
                        URL del Documento: <a href={docValue.url}>Download</a>
                      </p>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreationDepartment;
