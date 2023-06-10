import React, { useEffect, useState } from "react";
import ListWithoutDepartment from "./components/listWithoutDepartment/ListWithoutDepartment";
import InputLabel from "./components/inputLabel/InputLabel";
import ComboBox from "./components/comboBox/ComboBox";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetByVariableAdmin,
  ResetEmployeeByUid,
  StartGetEmployeeByUid,
  StartResetDepartByIdDoc,
  StartUpDateEmployee,
  selectGetAllDepartment,
  selectGetByIdDocDepartment,
  selectGetEmployeeByUid,
  startGetAllDepartment,
  startGetDepartByIdDoc,
  startUpdateDepartment,
} from "@/root/redux";
import { DepartmentType } from "@/root/types/Department.type";
import { EmployeesType } from "@/root/types/Employee.type";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import { toast } from "react-hot-toast";
import FilterList from "./components/filter/FilterList";
import { Employee } from "@/root/interface/departments";

let newEmployeeObject: Employee = {
  name: "",
  des: "",
  id: "",
};

const AssignDepartmentEmployee = () => {
  const dispatch = useDispatch();
  const departmentsList = useSelector(selectGetAllDepartment);
  const employeeSelect = useSelector(selectGetEmployeeByUid);
  const department = useSelector(selectGetByIdDocDepartment);

  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [employeeUpdate, setEmployeeUpdate] =
    useState<EmployeesType>(initialDataEmployee);
  const [change, setChange] = useState(false);

  useEffect(() => {
    dispatch(startGetAllDepartment());
  }, []);

  useEffect(() => {
    if (departmentsList && employeeSelect) {
      setDepartments(departmentsList);
      setEmployeeUpdate(employeeSelect);
    }
  }, [employeeSelect, dispatch]);

  const handleSave = async () => {
    if (employeeSelect && selectedOption) {
      console.log(department);
      const updatedDataEmployee: EmployeesType = {
        ...employeeSelect,
        idDepartment: selectedOption,
      };

      newEmployeeObject = {
        name: updatedDataEmployee.name,
        des: updatedDataEmployee.email,
        id: updatedDataEmployee.uid,
      };

      setEmployeeUpdate(updatedDataEmployee);

      await dispatch(
        StartUpDateEmployee(updatedDataEmployee.uid, updatedDataEmployee)
      );
      await dispatch(startGetDepartByIdDoc(selectedOption));
      dispatch(ResetEmployeeByUid());
      setEmployeeUpdate(initialDataEmployee);
      setChange(!change);
      if (employeeUpdate.name.length === 0) {
        toast.error("There is no employee loaded");
      } else {
        toast.success("Save success");
      }
    }
  };

  useEffect(() => {
    if (department) {
      const updatedDepartment = {
        ...department,
        employees: {
          ...department.employees,
          [newEmployeeObject.name]: newEmployeeObject,
        },
      };
      console.log(JSON.stringify(updatedDepartment.employees));
      dispatch(startUpdateDepartment(selectedOption, updatedDepartment));
      dispatch(StartResetDepartByIdDoc());
    }
  }, [department]);

  const handleClear = async () => {
    dispatch(ResetEmployeeByUid());
    dispatch(ResetByVariableAdmin());
    dispatch(StartResetDepartByIdDoc());

    toast.success("All clear");
  };
  const handleLoadEmployee = async (uid: string) => {
    dispatch(StartGetEmployeeByUid(uid));
  };

  return (
    <>
    <h1 className="text-center font-bold text-lg text-darkBlue pb-5">Employee department edition</h1>
      <div className="flex flex-wrap justify-center space-y-4 pb-10">
        <section className="flex flex-col mt-2 bg-white shadow-md items-center justify-center w-full md:w-1/2 lg:w-1/2">
          <h2 className="text-md text-center font-bold mb-4 m-4 bg-yellow rounded">
            Employees without department:
          </h2>
          <FilterList />
          <ListWithoutDepartment
            change={change}
            handleLoadEmployee={handleLoadEmployee}
          />
        </section>
        <section className="md:w-1/2 flex pb-5 justify-center lg:w-1/2">

          <div className="flex lg:flex-col md:flex-col sm:flex-row bg-lithBlue bg-opacity-20 mt-2 justify-center ">

            <div className="flex flex-col md:flex-row mx-2 w-full">
              <InputLabel
                label="Name"
                type="text"
                value={employeeUpdate.name}
                id="name"
              />
              <InputLabel
                label="Surname"
                type="text"
                value={employeeUpdate.firstSurname}
                id="firstSurname"
              />
              <InputLabel
                label="Second Surname"
                type="text"
                value={employeeUpdate.secondSurname}
                id="secondSurname"
              />
            </div>

            <div className="flex flex-col md:flex-row mx-2 items-center w-full">
              <InputLabel
                label="Email:"
                type="text"
                value={employeeUpdate.email}
                id="email"
              />
              <InputLabel
                label="Cedula"
                type="text"
                value={employeeUpdate.cedula}
                id="cedula"
              />
              <ComboBox
                items={departments}
                label="Departments"
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            <div className="flex flex-row justify-center mt-4 w-full">
              <div className="flex justify-between h-10 md:flex-row flex-col md:space-y-0 space-y-2 lg:w-1/2 sm:w-full">
                <button
                  className="bg-darkBlue w-full  sm:w-1/2 md:w-auto"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  className="bg-darkBlue w-full  sm:w-1/2 md:w-auto"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AssignDepartmentEmployee;
