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
    <>
      <h1 className="text-center text-darkBlue font-bold text-lg">Employees in the department</h1>
      <div className="w-full flex justify-center">
        <div className="overflow-x-auto sm:overflow-visible pt-4">
          {Object.keys(departmentsData.employees).length > 0 ? (
            <table className="min-w-full">
              <thead className="">
                <tr className="bg-black text-white">
                  <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium">
                    Name
                  </th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium ">
                    Email
                  </th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium">
                    Id Employee
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
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
          ) : (
            <>
              <p className="text-center w-60 h-60 flex justify-center items-center bg-opacity-70 bg-darkBlue text-yellow font-semibold">Not found employees fot this department 🤔</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
