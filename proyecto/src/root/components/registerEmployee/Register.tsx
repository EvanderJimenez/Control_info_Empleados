import React, { useState } from "react";
import { Schedule, UserData } from "../../interface/employee/";
import PrincipalData from "./components/principalData/PrincipalData";
import UpdateData from "./components/updateData/UpdateData";
import Brands from "./components/brands/Brands";
import ImageEmployee from "./components/imageEmployee/ImageEmployee";

import { useDispatch, useSelector } from "react-redux";
import { StartCreateEmployee, StartUpDateEmployee } from "../../redux/thunks/employee-thunk/employee.thunk";
import { RootState } from "../../redux/store";
import { EmployeesType } from "@/root/types/Employee.type";


const data = {
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
  vacations: {},
  attendance: {},
  files: {}
}

function Register() {
  const dispatch = useDispatch();

  const employeeByUid = useSelector((state: RootState) => state.getEmployeeByUidStore.getEmployeeByUid);

  const [upDate, setUpDate] = useState<boolean | null>();

  const [userData, setUserData] = useState<EmployeesType>(() => {
    if (employeeByUid) {
      setUpDate(true);
      return data
    } else {
      return data
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(StartCreateEmployee(userData));
    setUserData(data)
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(StartUpDateEmployee(userData.uid, userData));
  };

  const handleScheduleChange = (newSchedule: any) => {
    setUserData((prevUserData) => ({ ...prevUserData, schedule: newSchedule }));
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <PrincipalData handleInputChange={handleInputChange} handleScheduleChange={handleScheduleChange} userData={userData} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
