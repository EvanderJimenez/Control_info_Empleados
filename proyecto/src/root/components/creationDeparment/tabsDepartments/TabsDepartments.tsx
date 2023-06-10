import React, { useState } from "react";
import { ListDepartment } from "../../listDepartment/ListDeparment";
import AddEmployee from "../addEmployee/AddEmployee";
import { FormEmployee } from "../formEmployee/FormEmployee";
import Table from "../table/Table";
import { Department, Employee } from "@/root/interface/departments";
import SearchEmployeeDepart from "../SearchEmployeeDepart/SearchEmployeeDepart";
import ListEmployeeDepart from "../listEmployeeDepart/ListEmployeeDepart";

interface methods {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitEmployee: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGetDepartment: (id: string) => void;
  newEmployee: string;
  newEmployeeId: string;
  newEmployeeData: string;
  setNewEmployee: React.Dispatch<React.SetStateAction<string>>;
  setPassId: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeData: React.Dispatch<React.SetStateAction<string>>;
  setNewEmployeeId: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteEmployee: (employeeName: string | number) => void;
  setPassIdEmployee: React.Dispatch<React.SetStateAction<string>>;
  setNameDepart: React.Dispatch<React.SetStateAction<string>>;
  setIdNameEmployee: React.Dispatch<React.SetStateAction<string>>;
  handleUpdateEmployee: (
    employeeName: string,
    updatedEmployee: Employee
  ) => void;
}

export default function TabsDepartments({
  departmentsData,
  handleInputChange,
  handleSubmit,
  handleSubmitEmployee,
  newEmployee,
  newEmployeeData,
  setNewEmployee,
  setNewEmployeeData,
  handleGetDepartment,
  handleUpdate,
  setPassId,
  handleDeleteEmployee,
  setPassIdEmployee,
  handleUpdateEmployee,
  setIdNameEmployee,
  setNameDepart,
  ...props
}: methods) {
  const [activeTab, setActiveTab] = useState("ListDepartment");
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [option, setOption] = useState("FormDepartment");

  return (
    <div className="flex  flex-col min-h-screen h-auto w-auto">
      <div className="w-full h-full">
        <section role="tablist">
          <div className="mr-2" role="presentation">
            <button
              className={`bg-darkBlue  py-4 px-4 text-sm font-medium text-center ${
                activeTab === "ListDepartment" ? "active" : ""
              }`}
              id="ListDepartment-tab"
              type="button"
              role="tab"
              onClick={() => setActiveTab("ListDepartment")}
            >
              List department
            </button>
          </div>
        </section>
        {activeTab === "FormDepartment" && (
          <FormEmployee
            departmentsData={departmentsData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
          />
        )}
        {activeTab === "ListDepartment" && (
          <>
            <div>
              <ListDepartment
                handleGetDepartment={handleGetDepartment}
                setPassId={setPassId}
                setNameDepart={setNameDepart}
                option={activeTab}
                setOption={setActiveTab}
              />
            </div>
          </>
        )}
        {activeTab === "EditEmployee" && (
          <Table
            departmentsData={departmentsData}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        )}
      </div>
    </div>
  );
}
