import { Department } from "@/root/interface/departments";
import React, { useState, useEffect } from "react";
import MethodsDepartments from "../creationDeparment/methodsDepartment/MethodsDepartments";
import ButtonList from "./buttonList/ButtonList";
import { TableView } from "./tableView/TableView";
interface listDepartment {
  handleGetDepartment: (id: string) => void;
}
export const ListDepartment = ({
  handleGetDepartment,
  ...props
}: listDepartment) => {
  const [departmentData, setDepartmentData] = useState<Department[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    console.log(selectedDepartmentId);
  }, [selectedDepartmentId]);
  let filteredDepartments = [];
  if (searchTerm) {
    filteredDepartments = departmentData.filter((department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredDepartments = departmentData.slice(startIndex, startIndex + 1);
  }
  useEffect(() => {
    handleGetDepartments();
  }, []);

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
        console.log(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting department data", error);
    }
  };

  const handleNextPage = () => {
    if (startIndex + 1 < departmentData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleOpenDepartment = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
  };

  return (
    <div className="bg-white shadow-md rounded px-2 sm:px-8 pt-6 pb-8 mb-4 flex flex-col">
      {!selectedDepartmentId && (
        <div>
          <div className="bg-white shadow overflow-hidden rounded-lg p-2 sm:p-4">
            <div style={{ position: "relative" }}>
              <div className="flex mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 sm:py-2 sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search department..."
                />
              </div>
              <TableView
                filteredDepartments={filteredDepartments}
                handleOpenDepartment={handleOpenDepartment}
                handleGetDepartment={handleGetDepartment}
              />
              <ButtonList
                startIndex={startIndex}
                departmentData={departmentData}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
