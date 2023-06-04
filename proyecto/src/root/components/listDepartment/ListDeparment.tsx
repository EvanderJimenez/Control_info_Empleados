import { Department } from "@/root/interface/departments";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { TableList } from "./tableList/TableList";
import { SearchDepartment } from "../creationDeparment/SearchDepartment";
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
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGetDepartments = async () => {
    const response = await fetch(
      `/api/departments/by-page?pageSize=${pageSize}&currentPage=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setDepartmentData(data);
      if (data.length < pageSize * page) {
        setPage(0);
      }
    } else {
      toast.error("Error acquiring information");
    }
  };
  const handleDepartment = async (name: string) => {
    const response = await fetch(`/api/departments/by-name/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setDepartmentData(data);
    } else {
      toast.error("Error acquiring information");
    }
  };
  const handle = (id: string) => {
    setPassId(id);
  };

  useEffect(() => {
    if (page !== 0) {
      handleGetDepartments();
    } else {
      toast.error("No more information");
    }
  }, [page]);
  const handleGetDepart = () => {
    if (page !== 0) {
      setPage(page + 1);
    }
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 > 0 ? prevPage - 1 : 0));
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
          <button
            className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleGetDepart}
          >
            Load more departments
          </button>
          <SearchDepartment handleGet={handleDepartment} />
        </div>

        <TableList
          handle={handle}
          handleGetDepartment={handleGetDepartment}
          currentDepartments={currentDepartments}
        />
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
