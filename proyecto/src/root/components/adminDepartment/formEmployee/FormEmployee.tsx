import React, { useState } from "react";
import Input from "../input/Input";

interface RegisterEmployeesProps {
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  newEmployee: string;
  newEmployeeData: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
}

const FormEmployee = ({
  handleSubmitEmployee,
  newEmployee,
  newEmployeeData,
  setNewEmployee,
  setNewEmployeeData,
}: RegisterEmployeesProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <form onSubmit={handleSubmitEmployee} className="space-y-4">
        <Input
          label={"Name Employee:"}
          type={"text"}
          name={"newEmployee"}
          value={newEmployee}
          id={"employee"}
          onChange={(e) => setNewEmployee(e.target.value)}
        />

        <Input
          label={"Personal Information:"}
          type={"text"}
          name={"newEmployeeData"}
          value={newEmployeeData}
          id={"employee"}
          onChange={(e) => setNewEmployeeData(e.target.value)}
        />
        <div className="mb-1">
          <label
            htmlFor="documents"
            className="block text-gray-700 font-bold mb-2"
          >
            Image:
          </label>
          <input
            type="file"
            id="documents"
            name="documents"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Image perfil to the employee"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default FormEmployee;

/*
{image && <img src={image} alt="Uploaded image" />}
    <div className="flex items-center">
      <label htmlFor="image" className="mr-2 font-bold">
        Upload Image:
      </label>
      <input type="file" onChange={handleImageUpload} />
    </div>
    */
