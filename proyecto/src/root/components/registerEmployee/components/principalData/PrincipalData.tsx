import React from "react";
import InputLabel from "../inputLabel/InputLabel";
import Schedule from "../schedule/Schedule";
import { EmployeesType } from "@/root/types/Employee.type";
import toast from "react-hot-toast";
import InputFloatLabel from "@/root/components/ui/InputFloatLabel/InputFloatLabel";

interface RegisterProps {
  userData: EmployeesType;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleScheduleChange: (newSchedule: any) => void;//TODO: Type all variables that you use
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PrincipalData = ({ userData, handleInputChange, handleScheduleChange, handleSubmit }: RegisterProps) => {
  return (
    <div>
        <p className="font-semibold text-lithGray">Register</p>
      <form onSubmit={handleSubmit}>
        <div className="bg-lithBlue flex items-center justify-center flex-grow h-full w-full  space-x-4 p-10">
          <div className="xl:w-1/3">
            {" "}
            <InputFloatLabel labelFloat={"Email"} type={"email"} name={"email"} value={userData.email} id={"email"} onChange={handleInputChange} />
            <InputFloatLabel labelFloat={"Password"} type={"password"} name={"password"} value={userData.password} id={"password"} onChange={handleInputChange} />
            <InputFloatLabel labelFloat={"Name"} type={"text"} name={"name"} value={userData.name} id={"name"} onChange={handleInputChange} />
          </div>

          <div className="xl:w-1/3">
            <InputFloatLabel labelFloat={"Fist surname"} type={"text"} name={"firstSurname"} value={userData.firstSurname} id={"firstSurname"} onChange={handleInputChange} />
            <InputFloatLabel labelFloat={"Second surname"} type={"text"} name={"secondSurname"} value={userData.secondSurname} id={"secondSurname"} onChange={handleInputChange} />
            <InputFloatLabel labelFloat={"Phone number"} type={"number"} name={"phoneNumber"} value={userData.phoneNumber.toString()} id={"phoneNumber"} onChange={handleInputChange} />
          </div>
          <div className="xl:w-1/3 space-y-12">
            <InputFloatLabel labelFloat={"Cedula"} type={"number"} name={"cedula"} value={userData.cedula.toString()} id={"cedula"} onChange={handleInputChange} />
            <button onClick={() => toast.success("save")} type="submit" className="bg-blue flex flex-row hover:bg-blue-700 text-white justify-between font-bold py-2 px-4  w-full rounded">
              Save
              <img  src="/Images/searchIcon.png" alt="search" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrincipalData;
