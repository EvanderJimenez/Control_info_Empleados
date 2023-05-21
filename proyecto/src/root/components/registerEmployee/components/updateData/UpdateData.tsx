import React, { useState } from "react";
import { UserData } from "@/root/interface/employee";
import InputLabel from "../inputLabel/InputLabel";
import Schedule from "../schedule/Schedule";
import Brands from "../brands/Brands";
import { RootState } from "@/root/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectGetEmployeeByUid, selectListOfEmployee } from "@/root/redux/selectors/employee-selector/employee.selector";
import { EmployeesType } from "@/root/types/Employee.type";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";

interface UpdateDataProps {

  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UpdateData = ({ handleInputChange, handleSubmit }: UpdateDataProps) => {

  const dispatch = useDispatch();

  const getEmployeeByUid = useSelector(selectGetEmployeeByUid );

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  return (

    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
          <InputLabel label={"Email"} type={"email"} name={"email"} value={getEmployeeByUid?.email ?? ''} id={"email"} onChange={handleInputChange} />

          <InputLabel label={"Name"} type={"text"} name={"name"} value={getEmployeeByUid?.name ?? ''} id={"name"} onChange={handleInputChange} />

          <InputLabel label={"Fist Username"} type={"text"} name={"firstSurname"} value={getEmployeeByUid?.firstSurname ?? ''} id={"firstSurname"} onChange={handleInputChange} />

          <InputLabel label={"Second Username"} type={"text"} name={"secondSurname"} value={getEmployeeByUid?.secondSurname ?? ''} id={"secondSurname"} onChange={handleInputChange} />

           <InputLabel label={"Cedula"} type={"number"} name={"cedula"} value={getEmployeeByUid?.cedula ?? ''} id={"cedula"} onChange={handleInputChange} />

          <InputLabel label={"Phone number"} type={"number"} name={"phoneNumber"} value={getEmployeeByUid?.phoneNumber ?? ''} id={"phoneNumber"} onChange={handleInputChange} />

          <InputLabel label={"Boss"} type={"text"} name={"boss"} value={getEmployeeByUid?.boss ?? ''} id={"boss"} onChange={handleInputChange} />

          <InputLabel label={"Salary"} type={"text"} name={"salary"} value={getEmployeeByUid?.salary ?? ''} id={"salary"} onChange={handleInputChange} />

          <InputLabel label={"Department"} type={"text"} name={"idDepartment"} value={getEmployeeByUid?.idDepartment ?? ''} id={"idDepartment"} onChange={handleInputChange} /> 

          <button type="submit" className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            UpDate
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateData;
