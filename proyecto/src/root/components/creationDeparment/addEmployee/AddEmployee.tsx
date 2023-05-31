import React, { useState } from "react";
import InputDepartment from "../input/InputDepartment";

interface RegisterEmployeesProps {
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  newEmployee: string;
  newEmployeeData: string;
  newEmployeeId: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeId: React.Dispatch<React.SetStateAction<string>>;
}

const AddEmployee = ({
  handleSubmitEmployee,
  newEmployee,
  newEmployeeData,
  setNewEmployee,
  setNewEmployeeData,
  newEmployeeId,
  setNewEmployeeId,
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
            id={"newEmployee"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewEmployee(e.target.value)}
          />

          <InputDepartment
            label={"Personal Information:"}
            type={"text"}
            name={"newEmployeeData"}
            value={newEmployeeData}
            id={"newEmployeeData"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewEmployeeData(e.target.value)}
          />
          <InputDepartment
            label={"Id employee:"}
            type={"text"}
            name={"newEmployeeId"}
            value={newEmployeeId}
            id={"newEmployeeId"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewEmployeeId(e.target.value)}
          />

          <div className="flex justify-center">
            <button
              className="mt-6 bg-darkBlue font-semibold text-white px-5 py-3 "
              type="submit"
            >
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddEmployee;
