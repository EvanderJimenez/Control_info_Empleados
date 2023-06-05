import React from "react";
import InputEmployee from "./inputEmployee/InputEmployee";
import { EmployeesType } from "@/root/types/Employee.type";
import { ResetEmployeeByUid } from "@/root/redux";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
interface EmployeesData {
  userData: EmployeesType;

  upDate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterFormEmployee({ userData, handleInputChange, upDate, ...props }: EmployeesData) {
  const dispatch = useDispatch();

  const handleClear = async () => {
    dispatch(ResetEmployeeByUid());
    toast.success("All clear")
  };
  return (
    <div>
      <div className="min-h-screen flex  bg-lithBlue bg-opacity-60  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full shadow-lg p-6 bg-white rounded-lg">
          <h1 className="text-center font-bold text-xl pb-8">Boss edition, please upload the information</h1>
          <form className="space-y-6 font-semibold flex flex-col" onSubmit={upDate}>
            <div className="flex flex-row justify-between space-x-4">
              <InputEmployee label={"Name"} type={"name"} name={"name"} value={userData.name} id={"name"} onChange={handleInputChange} />
              <InputEmployee label={"First surname"} type={"firstSurname"} name={"firstSurname"} value={userData.firstSurname} id={"firstSurname"} onChange={handleInputChange} />
            </div>

            <div className="flex flex-row justify-between space-x-4">
              <InputEmployee label={"Second surname"} type={"secondSurname"} name={"secondSurname"} value={userData.secondSurname} id={"secondSurname"} onChange={handleInputChange} />

              <InputEmployee label={"Identification"} type={"cedula"} name={"cedula"} value={userData.cedula} id={"cedula"} onChange={handleInputChange} />
            </div>

            <div className="flex flex-row justify-between space-x-4">
              <InputEmployee label={"Salary for moth"} type={"salary"} name={"salary"} value={userData.salary} id={"salary"} onChange={handleInputChange} />
              <InputEmployee label={"Email"} type={"email"} name={"email"} value={userData.email} id={"Department"} onChange={handleInputChange} />
            </div>

            <div className="flex flex-row justify-between space-x-4">
              <InputEmployee label={"Phone number"} type={"phoneNumber"} name={"phoneNumber"} value={userData.phoneNumber} id={"phoneNumber"} onChange={handleInputChange} />
              <InputEmployee label={"Job Position"} type={"jobPosition"} name={"jobPosition"} value={userData.jobPosition} id={"jobPosition"} onChange={handleInputChange} />
            </div>
            <InputEmployee label={"Departments to belongs"} type={"idDepartment"} name={"idDepartment"} value={userData.idDepartment} id={"idDepartment"} onChange={handleInputChange} />

            <InputEmployee label={"Boss for whom he works"} type={"boss"} name={"boss"} value={userData.boss} id={"boss"} onChange={handleInputChange} />
            <div className="w-full">
              <div className="flex justify-between">
                <button type="submit" className=" py-3 mt-6 font-medium tracking-widest text-white uppercase bg-darkBlue shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                  Save
                </button>
                <button onClick={handleClear} className=" py-3 mt-6 font-medium tracking-widest text-white uppercase bg-darkBlue shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
