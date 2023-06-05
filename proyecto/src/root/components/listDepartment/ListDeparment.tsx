import { Department } from "@/root/interface/departments";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { TableList } from "./tableList/TableList";
import { SearchDepartment } from "../creationDeparment/SearchDepartment";
import { useDispatch, useSelector } from "react-redux";
import {
  StartResetDepartmentByName,
  StartResetDepartmentByPage,
  selectGetByNameDepartment,
  selectGetByPageDepartment,
  startGetDepartmentByName,
  startGetDepartmentByPage,
} from "@/root/redux";
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

  const departByPage = useSelector(selectGetByPageDepartment);
  const departByName = useSelector(selectGetByNameDepartment);
  const dispatch = useDispatch();

  const handleGetDepartments = async () => {
    dispatch(startGetDepartmentByPage(pageSize, page));
    dispatch(StartResetDepartmentByName())
  };
  const handleDepartment = async (name: string) => {
    dispatch(startGetDepartmentByName(name));

    dispatch(StartResetDepartmentByPage());
  }; 

  useEffect(() => {
    if (departByName.length > 0) {
      console.log(departByName);
      setDepartmentData(departByName);
    } else if (departByPage.length > 0) {
      console.log(departByPage);
      setDepartmentData(departByPage);
    }
  }, [departByName, departByPage]);

  useEffect(() => {
    if (departByPage) {
    }
  }, [departByPage]);

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
    <div className="bg-white shadow overflow-hidden flex flex-col rounded-lg p-2 sm:p-4">
      <div className="flex mb-4 justify-center">
        <div className="flex flex-col md:flex-row mb-4">
          <div className="w-full flex flex-col space-y-2 md:w-1/2 md:pr-2 mb-2 md:mb-0">
            
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="border rounded-md px-2 py-1 sm:py-2 sm:text-sm focus:outline-none"
                placeholder="Search department..."
              />
              <button
                className="flex justify-center text-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 "
                onClick={handleGetDepart}
              >
                more departments
              </button>
    
          </div>

          <div className="w-full md:w-1/2 md:pl-2">
            <SearchDepartment handleGet={handleDepartment} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <TableList
          handle={handle}
          handleGetDepartment={handleGetDepartment}
          currentDepartments={currentDepartments}
        />
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
  );
};
