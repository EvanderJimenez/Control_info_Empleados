import React from "react";
import { Department } from "@/root/interface/departments";
import { useDispatch } from "react-redux";
import { startGetDepartmentById } from "@/root/redux";
interface TableListProps {
  handle: (id: string, name: string) => void;
  handleGetDepartment: (id: string) => void;
  currentDepartments: Department[];
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

export const TableList = ({
  handle,
  currentDepartments,
  setOption,
}: TableListProps) => {
  const dispatch = useDispatch();

  const handleListEmployees = async (id: string) => {
    console.log(id);
    dispatch(startGetDepartmentById(id));
    setOption("EditEmployee");
  };

  const handleGetDepartment = async (id: string) => {
    console.log(id);
    dispatch(startGetDepartmentById(id));
    setOption("FormDepartment");
  };

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
                See employees
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
                    onClick={() => handleListEmployees(department.id)}
                  >
                    See
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
