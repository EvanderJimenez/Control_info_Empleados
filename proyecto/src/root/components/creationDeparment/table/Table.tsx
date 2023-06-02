import { Department, Employee } from "@/root/interface/departments";
import React, { useState } from "react";

interface TableProps {
  departmentsData: Department | undefined;
  handleDeleteEmployee: (employeeName: string | number) => void;
  handleUpdateEmployee: (
    employeeName: string,
    updatedEmployee: Employee
  ) => void;
}

const Table = ({
  departmentsData,
  handleDeleteEmployee,
  handleUpdateEmployee,
}: TableProps) => {
  const [editingEmployee, setEditingEmployee] = useState<string>("");

  const handleEditEmployee = (employeeName: string) => {
    setEditingEmployee(employeeName);
  };

  const handleSaveEmployee = (
    employeeName: string,
    updatedEmployee: Employee
  ) => {
    setEditingEmployee("");
    handleUpdateEmployee(employeeName, updatedEmployee);
  };

  if (!departmentsData) {
    return null;
  }

  if (
    !departmentsData.employees ||
    typeof departmentsData.employees !== "object"
  ) {
    return null;
  }
  return (
    <div>
      <div className="overflow-x-auto sm:overflow-visible">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="bg-black text-white">
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Personal Information
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Id Employee
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(departmentsData.employees).map(([key, value]) => (
              <tr key={key} className="odd:bg-white even:bg-lithBlue">
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {key}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">
                  {editingEmployee === key ? (
                    <input
                      type="textArea"
                      value={value.des}
                      onChange={(e) =>
                        handleUpdateEmployee(key, {
                          ...value,
                          des: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{value.des}</p>
                  )}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">
                  {editingEmployee === key ? (
                    <input
                      type="text"
                      value={value.id}
                      onChange={(e) =>
                        handleUpdateEmployee(key, {
                          ...value,
                          id: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{value.id}</p>
                  )}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex justify-start text-right text-sm font-medium">
                  {editingEmployee === key ? (
                    <button
                      className="bg-black"
                      onClick={() =>
                        handleSaveEmployee(key, departmentsData.employees[key])
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-black"
                      onClick={() => handleEditEmployee(key)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="bg-black"
                    onClick={() => handleDeleteEmployee(key)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
