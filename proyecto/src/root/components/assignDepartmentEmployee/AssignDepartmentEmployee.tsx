import React, { useEffect, useState } from "react";
import Filters from "../bossSection/vacationsRequestBoss/components/filters/Filters";
import ListWithoutDepartment from "./components/listWithoutDepartment/ListWithoutDepartment";
import InputLabel from "./components/inputLabel/InputLabel";
import ComboBox from "./components/comboBox/ComboBox";
import { useDispatch, useSelector } from "react-redux";
import { ResetEmployeeByUid, StartGetEmployeeByUid, StartUpDateEmployee, selectGetAllDepartment, selectGetEmployeeByUid, startGetAllDepartment } from "@/root/redux";
import { DepartmentType } from "@/root/types/Department.type";
import { EmployeesType } from "@/root/types/Employee.type";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import { toast } from "react-hot-toast";

const AssignDepartmentEmployee = () => {
  const dispatch = useDispatch();
  const departmentsList = useSelector(selectGetAllDepartment);
  const employeeSelect = useSelector(selectGetEmployeeByUid);

  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [employeeUpdate, setEmployeeUpdate] = useState<EmployeesType>(initialDataEmployee);
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
      const updatedDataEmployee: EmployeesType = {
        ...employeeSelect,
        idDepartment: selectedOption,
      };

      setEmployeeUpdate(updatedDataEmployee);

      await dispatch(StartUpDateEmployee(updatedDataEmployee.uid, updatedDataEmployee));
      dispatch(ResetEmployeeByUid());
      setEmployeeUpdate(initialDataEmployee);
      setChange(!change);
      if(employeeUpdate.name.length === 0){
       toast.error("There is no employee loaded")
      }else{
        toast.success("Save success")
      }
      
    }
  };

  const handleClear = async () => {
    dispatch(ResetEmployeeByUid());
    toast.success("All clear")
  };
  const handleLoadEmployee = async (uid: string) => {
    dispatch(StartGetEmployeeByUid(uid));
  };

  return (
    <div className="flex flex-wrap justify-center pb-10">
      <section className="md:w-1/2 flex  justify-center lg:w-2/3">
        <div className="flex lg:flex-col md:flex-col sm:flex-row bg-lithBlue bg-opacity-20 mt-2 justify-center ">
          <div className="flex flex-col md:flex-row mx-2 w-full">
            <InputLabel label="Name" type="text" value={employeeUpdate.name} id="name" />
            <InputLabel label="Surname" type="text" value={employeeUpdate.firstSurname} id="firstSurname" />
            <InputLabel label="Second Surname" type="text" value={employeeUpdate.secondSurname} id="secondSurname" />
          </div>

          <div className="flex flex-col md:flex-row mx-2 items-center w-full">
            <InputLabel label="Email:" type="text" value={employeeUpdate.email} id="email" />
            <InputLabel label="Cedula" type="text" value={employeeUpdate.cedula} id="cedula" />
            <ComboBox items={departments} label="Departments" selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          </div>
          <div className="flex flex-row justify-center mt-4 w-full">
            <div className="flex justify-between h-10 md:flex-row flex-col md:space-y-0 space-y-2 lg:w-1/2 sm:w-full">
              <button className="bg-darkBlue w-full  sm:w-1/2 md:w-auto" onClick={handleClear}>
                Clear
              </button>
              <button className="bg-darkBlue w-full  sm:w-1/2 md:w-auto" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-2 bg-lithBlue bg-opacity-20 shadow-md items-center justify-center w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-md text-center font-bold mb-4 m-4 bg-yellow rounded">Employees without department:</h2>
        <ListWithoutDepartment change={change} handleLoadEmployee={handleLoadEmployee} />
      </section>
    </div>
  );
};

export default AssignDepartmentEmployee;
