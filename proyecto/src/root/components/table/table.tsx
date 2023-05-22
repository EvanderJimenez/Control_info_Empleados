import React from "react";
import Content from "./content/Content";
import { Department, Employee } from "@/root/interface/departments";
interface employesDepart {
  employeeDepa: Department;
  onEditEmployee: (employeeName: string, updatedEmployee: Employee) => void;
  onDeleteEmployee: (employeeName: string) => void;
}
const ScrollableTable = ({ employeeDepa, ...props }: employesDepart) => {
  console.log(employeeDepa.employees);
  return (
    <div>
      <body className="antialiased font-sans bg-gray-200">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                Employees
              </h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col"></div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Selection
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <Content
                      content={employeeDepa}
                      onEditEmployee={props.onEditEmployee}
                      onDeleteEmployee={props.onDeleteEmployee}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default ScrollableTable;
