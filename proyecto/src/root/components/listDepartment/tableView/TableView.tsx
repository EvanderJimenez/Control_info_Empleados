import { Department } from "@/root/interface/departments";
import React from "react";
interface table {
  filteredDepartments: Department[];
  handleOpenDepartment: (departmentId: string) => void;
  handleGetDepartment: (id: string) => void;
}
export const TableView = ({
  handleOpenDepartment,
  filteredDepartments,
  ...props
}: table) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#B3B6B7]">
              <tr>
                <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Boss
                </th>
                <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Id Boss
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
                  Add Department
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDepartments.map(
                (department: Department, index: number) => (
                  <tr key={index}>
                    <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                      {department.name}
                    </td>
                    <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                      {department.leader}
                    </td>
                    <td className="px-2 sm:px-6 py-2 whitespace-nowrap">
                      {department.idEmployee}
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
                        onClick={() => props.handleGetDepartment(department.id)}
                      >
                        EDIT
                      </button>
                    </td>
                    <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 bg-blue"
                        onClick={() => props.handleGetDepartment(department.id)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
