import { Department, Employee } from "@/root/interface/departments";
import React from "react";

interface TableProps {
  departmentsData: Department | undefined;
  handleDeleteEmployee: (employeeName: string | number) => void;
}

const Table = ({
  departmentsData,
}: TableProps) => {
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(departmentsData.employees).map(([key, value]) => (
              <tr key={key} className="odd:bg-white even:bg-lithBlue">
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {key}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">
                  <p>{value.des}</p>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">
                  <p>{value.id}</p>
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
