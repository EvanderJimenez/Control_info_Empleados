import React, { useState } from "react";
import InputDepartment from "../input/InputDepartment";

interface RegisterEmployeesProps {
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  newEmployee: string;
  newEmployeeData: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
  formRef: React.RefObject<HTMLFormElement>;
  handleToggleDocumentsForm: () => void;
}

const AddEmployee = ({
  handleSubmitEmployee,
  newEmployee,
  newEmployeeData,
  setNewEmployee,
  setNewEmployeeData,
  handleToggleDocumentsForm,
  formRef,
}: RegisterEmployeesProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="w-full bg-grey-500">
        <div className="container mx-auto py-8">
          <div className="w-96 mx-auto bg-white rounded shadow">
            <form
              className="mx-auto mt-16 max-w-xl sm:mt-20 border border-blue rounded"
              onSubmit={handleSubmitEmployee}
              ref={formRef}
            >
              <h1 className="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-grey-500">
                Add Employee for Department
              </h1>
              <div className="py-4 px-8">
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

                <div className="mb-4">
                  <button
                    className="bg-[#049473] cmb-2 mx-16 rounded-full px-10"
                    type="submit"
                  >
                    Save Employee
                  </button>
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0 px-10">
                  <button
                    onClick={handleToggleDocumentsForm}
                    className="bg-[#049473] hover:bg-sky text-white font-bold py-2 px-4 rounded "
                  >
                    AddEmployee
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddEmployee;
