import { Department } from "@/root/interface/departments";
import React from "react";
interface table {
  departmentsData: Department;
}
const Table = ({ departmentsData, ...props }: table) => {
  return (
    <div>
      <div className="overflow-x-auto sm:overflow-visible">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Personal Information
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(departmentsData.employees).map(([key, value]) => (
              <tr key={key}>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {key}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <p>{value.des}</p>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Object.entries(value.documents).map(([docKey]) => (
                    <div key={docKey}>
                      <p>{docKey}</p>
                    </div>
                  ))}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="bg-black text-indigo-600 hover:text-indigo-900">
                    Select
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
