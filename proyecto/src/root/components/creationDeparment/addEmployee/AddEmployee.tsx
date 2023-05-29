import React, { useState } from "react";
import InputDepartment from "../input/InputDepartment";

interface RegisterEmployeesProps {
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  newEmployee: string;
  newEmployeeData: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitDocuments: (event: React.FormEvent<HTMLFormElement>) => void;
  newDocuments: string;
  setNewDocuments: React.Dispatch<React.SetStateAction<string>>;
}

const AddEmployee = ({
  handleSubmitDocuments,
  newDocuments,
  setNewDocuments,
  handleSubmitEmployee,
  newEmployee,
  newEmployeeData,
  setNewEmployee,
  setNewEmployeeData,
}: RegisterEmployeesProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-10 w-full max-w-lg">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
          Add Employee for Department
        </h1>
        <form onSubmit={handleSubmitEmployee} className="space-y-6">
          <InputDepartment
            label={"Name Employee:"}
            type={"text"}
            name={"newEmployee"}
            value={newEmployee}
            id={"employee"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewEmployee(e.target.value)}
          />

          <InputDepartment
            label={"Personal Information:"}
            type={"text"}
            name={"newEmployeeData"}
            value={newEmployeeData}
            id={"employee"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewEmployeeData(e.target.value)}
          />

          <div className="space-y-2">
            <label
              htmlFor="documents"
              className="block text-gray-700 text-sm font-medium"
            >
              Image:
            </label>
            <input
              type="file"
              id="documents"
              name="documents"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Image profile for the employee"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="mt-6 bg-darkBlue font-semibold text-white px-5 py-3 "
              type="submit"
            >
              Save Employee
            </button>
          </div>
        </form>

        <hr className="my-8" />

        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
          Add Documents for Department
        </h1>
        <form onSubmit={handleSubmitDocuments} className="space-y-6">
          <InputDepartment
            label={"Document Name:"}
            type={"text"}
            name={"newDocuments"}
            value={newDocuments}
            id={"newDocuments"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewDocuments(e.target.value)}
          />

          <div className="space-y-2">
            <label
              htmlFor="documents"
              className="block text-gray-700 text-sm font-medium"
            >
              Upload Document:
            </label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="mt-6 bg-black text-white px-5 py-3 rounded hover:bg-green-600"
              type="submit"
            >
              Save Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddEmployee;
