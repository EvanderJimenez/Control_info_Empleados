import { Department } from "@/root/interface/departments";
import React, { useState, useEffect } from "react";
import MethodsDepartments from "../creationDeparment/methodsDepartment/MethodsDepartments";
import { useDispatch } from "react-redux";
interface lisDepartment {
  handleGetDepartment: (id: string) => void;
  setPassId: (id: string) => void;
}
export const ListDepartment = ({
  handleGetDepartment,
  setPassId,
  ...props
}: lisDepartment) => {
  const [departmentData, setDepartmentData] = useState<Department[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGetDepartments();
  }, []);
  const handle = (id: string) => {
    setPassId(id);
    console.log(id);
  };
  const handleGetDepartments = async () => {
    try {
      const response = await fetch("/api/departments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDepartmentData(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting department data", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const filteredDepartments = departmentData.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDepartments = filteredDepartments.slice(startIndex, endIndex);

  return (
    <div className="bg-white shadow-md rounded px-2 sm:px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="bg-white shadow overflow-hidden rounded-lg p-2 sm:p-4">
        <div className="flex mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1 sm:py-2 sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search department..."
          />
        </div>
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
                    Pass Id Department
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentDepartments.map(
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
                          onClick={() => handleGetDepartment(department.id)}
                        >
                          EDIT
                        </button>
                      </td>
                      <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 bg-blue"
                          onClick={() => handle(department.id)}
                        >
                          ADD
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleNextPage}
            disabled={endIndex >= filteredDepartments.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
