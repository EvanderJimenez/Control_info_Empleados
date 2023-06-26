import React from "react";
import { Department } from "@/root/interface/departments";
import { useDispatch, useSelector } from "react-redux";
import { selectGetDepartmentById, startGetDepartmentById } from "@/root/redux";
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
  const listDepartment = useSelector(selectGetDepartmentById)

  const handleListEmployees = async (id: string) => {
    dispatch(startGetDepartmentById(id));
    setOption("EditEmployee");
  };

  const handleGetDepartment = async (id: string) => {
    dispatch(startGetDepartmentById(id));
    setOption("FormDepartment");
  };

  return (
    <div className="overflow-auto flex justify-center">
      <div className="inline-block w-auto overflow-auto">
        <table className="min-w-full font-semibold overflow-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium">
                Department
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium">
                Boss
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium">
                Location
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium">
                Size
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium">
                Actions
              </th>
              <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium">
                See employees
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {currentDepartments.map((department: Department, index: number) => (
              <tr key={index} className="even:bg-white odd:bg-lithBlue">
                <td className="px-2 sm:px-6 py-2">
                  {department.name}
                </td>
                <td className="px-2 sm:px-6 py-2">
                  {department.leader}
                  {department.leader.length === 0 && <div>----</div>}
                </td>
                <td className="px-2 sm:px-6 py-2">
                  {department.location}
                </td>
                <td className="px-2 sm:px-6 py-2">
                  {department.size}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:text-sm font-medium">
                  <button
                    className="bg-darkBlue"
                    onClick={() => handleGetDepartment(department.id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-2 sm:px-6 py-2 text-right text-xs sm:text-sm font-medium">
                  <button
                    className="bg-darkBlue"
                    onClick={() => handleListEmployees(department.id)}
                  >
                    View
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
