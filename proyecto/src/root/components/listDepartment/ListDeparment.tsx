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
  setNameDepart: (name: string) => void;
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

export const ListDepartment = ({
  handleGetDepartment,
  setPassId,
  setNameDepart,
  option,
  setOption,
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
    dispatch(StartResetDepartmentByName());
  };
  const handleDepartment = async (name: string) => {
    dispatch(startGetDepartmentByName(name));

    dispatch(StartResetDepartmentByPage());
  };

  useEffect(() => {
    if (departByName.length > 0) {
      setDepartmentData(departByName);
    } else if (departByPage.length > 0) {
      setDepartmentData(departByPage);
    }
  }, [departByName, departByPage]);

  useEffect(() => {
    if (departByPage) {
    }
  }, [departByPage]);

  const handle = (id: string, name: string) => {
    setPassId(id);
    setNameDepart(name);
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
    if (endIndex < filteredDepartments.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      handleGetDepart();
    }
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
    <div className=" shadow flex pb-12 flex-col ">
      <div className="text-center">
        <h2 className="text-xl text-darkBlue font-bold ">
          Departments
        </h2>
        <p className="mt-2 text-lg font-semibold">
          Available departments of the company
        </p>
      </div>
      <div className="flex mb-4 justify-center">
        <div className="w-full md:w-1/2 md:pl-2">
          <SearchDepartment handleGet={handleDepartment} />
        </div>
      </div>

      <div className="overflow-x-auto">

        <TableList
          handle={handle}
          handleGetDepartment={handleGetDepartment}
          currentDepartments={currentDepartments}
          option={option}
          setOption={setOption}
        />
      </div>
      <div className="flex w-full justify-center">
     <section className="flex w-1/2 justify-between mt-4">
        <button
          className="bg-darkBlue font-semibold"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <button
          className="bg-darkBlue font-semibold"
          onClick={handleNextPage}
        >
          Next
        </button>
      </section>
      </div>
 
    </div>
  );
};
