import React from "react";
import { Department } from "@/root/interface/departments";
interface TableListProps {
  handle: (id: string, name: string) => void;
  handleGetDepartment: (id: string) => void;
  currentDepartments: Department[];
}

export const TableList = ({
  handle,
  handleGetDepartment,
  currentDepartments,
}: TableListProps) => {
  return (
    <div className="overflow-auto flex justify-center">
      <div className="inline-block w-auto overflow-hidden">
        <table className="min-w-full divide-y">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium  uppercase tracking-wider">
                Boss
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Pass Id Department
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDepartments.map((department: Department, index: number) => (
              <tr key={index} className="even:bg-white odd:bg-lithBlue">
                <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                  {department.name}
                </td>
                <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                  {department.leader}
                </td>
                <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                  {department.location}
                </td>
                <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                  {department.size}
                </td>
                <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 bg-blue"
                    onClick={() => handleGetDepartment(department.id)}
                  >
                    EDIT
                  </button>
                </td>
                <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 bg-blue"
                    onClick={() => handle(department.id, department.name)}
                  >
                    ADD
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
