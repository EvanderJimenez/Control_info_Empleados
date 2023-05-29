import { Department } from "@/root/interface/departments";
import React from "react";
interface ButtonProps {
  startIndex: number;
  departmentData: Department[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}
const ButtonList = ({
  startIndex,
  departmentData,
  handlePreviousPage,
  handleNextPage,
  ...props
}: ButtonProps) => {
  return (
    <div>
      <div className="flex justify-between mt-4">
        <button
          className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handlePreviousPage}
          disabled={startIndex === 0}
        >
          Previous
        </button>
        <button
          className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleNextPage}
          disabled={startIndex + 1 >= departmentData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ButtonList;
