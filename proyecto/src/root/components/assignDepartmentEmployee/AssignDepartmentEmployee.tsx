import React, { useEffect, useState } from "react";
import Filters from "../bossSection/vacationsRequestBoss/components/filters/Filters";
import ListWithoutDepartment from "./components/listWithoutDepartment/ListWithoutDepartment";
import InputForm from "../brands/InputForm";
import InputLabel from "./components/inputLabel/InputLabel";
import ComboBox from "./components/comboBox/ComboBox";
import { useDispatch, useSelector } from "react-redux";
import { StartGetEmployeeByUid, StartUpDateEmployee, selectGetAllDepartment, selectGetEmployeeByUid, startGetAllDepartment } from "@/root/redux";
import { DepartmentType } from "@/root/types/Department.type";
import { EmployeesType } from "@/root/types/Employee.type";

const AssignDepartmentEmployee = () => {
  const dispatch = useDispatch();
  const departmentsList = useSelector(selectGetAllDepartment);
  const employeeSelect = useSelector(selectGetEmployeeByUid);

  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [employeeUpdate, setEmployeeUpdate] = useState<EmployeesType>(
    {
      uid: "",
      name: "",
      firstSurname: "",
      secondSurname: "",
      cedula: 0,
      phoneNumber: 0,
      photo: "",
      jobPosition: "",
      salary: 0,
      enabled: true,
      idDepartment: "0",
      password: "",
      email: "",
      boss: "",
      schedule: [],
      vacations: {}
    }
  )

  useEffect(() => {
    dispatch(startGetAllDepartment());
  }, []);

  useEffect(() => {

    if (departmentsList && employeeSelect) {
      setDepartments(departmentsList);
      setEmployeeUpdate(employeeSelect)
    }
  }, [employeeSelect,dispatch]);

  const handleSave = async () => {
    if (employeeSelect && selectedOption) {
      const updatedDataEmployee: EmployeesType = {
        ...employeeSelect,
        idDepartment: selectedOption,
      };

      setEmployeeUpdate(updatedDataEmployee);

      await dispatch(StartUpDateEmployee(updatedDataEmployee.uid, updatedDataEmployee));
    }
  };



  const handleLoadEmployee = async (uid: string) =>{
    dispatch(StartGetEmployeeByUid(uid))
  }

  return (
    <div className="flex flex-row m-1">
      <section className="m-2">
        <div>
          <Filters />
        </div>
        <div>
          <ListWithoutDepartment handleLoadEmployee={handleLoadEmployee}/>
        </div>
      </section>

      <section className="flex flex-col border-2 items-center justify-start">
        <div className="flex flex-row m-2 ">
          <InputLabel label="Name" type="text" value={employeeUpdate.name} id="name" />
          <InputLabel label="Surname" type="text" value={employeeUpdate.firstSurname} id="firstSurname" />
          <InputLabel
            label="Second Surname"
            type="text"
            value={employeeUpdate.secondSurname}
            id="secondSurname"
          />
        </div>

        <div className="flex flex-row">
          <InputLabel label="Email:" type="text" value={employeeUpdate.email} id="email" />
          <InputLabel label="Cedula" type="text" value={employeeUpdate.uid} id="cedula" />
          <InputLabel
            label="Phone Number"
            type="text"
            value={employeeUpdate.uid}
            id="phoneNumber"
          />
        </div>

        <div>
        <InputLabel label="Id Department" type="text" value={selectedOption} id="" />
          <ComboBox items={departments} label="Departments" selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        </div>
        <div>
          <button className="bg-darkBlue" onClick={handleSave}>Save</button>
        </div>
      </section>
    </div>
  );
};

export default AssignDepartmentEmployee;