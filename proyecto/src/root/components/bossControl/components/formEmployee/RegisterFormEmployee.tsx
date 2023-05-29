import React from "react";
import InputEmployee from "./inputEmployee/InputEmployee";
import { UserData } from "@/root/interface/employee";
import { EmployeesType } from "@/root/types/Employee.type";
import { ResetEmployeeByUid } from "@/root/redux";
import { useDispatch } from "react-redux";
interface EmployeesData {
  userData: EmployeesType;

  upDate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterFormEmployee({
  userData,
  handleInputChange,
  upDate,
  ...props
}: EmployeesData) {

  const dispatch = useDispatch()  

  const handleClear = async () => {
    dispatch(ResetEmployeeByUid());
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
          <form className="space-y-6" onSubmit={upDate}>
            <div className="grid grid-cols-2 gap-4">
              <InputEmployee
                label={"Name"}
                type={"name"}
                name={"name"}
                value={userData.name}
                id={"name"}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputEmployee
                label={"First surname"}
                type={"firstSurname"}
                name={"firstSurname"}
                value={userData.firstSurname}
                id={"firstSurname"}
                onChange={handleInputChange}
              />
              <InputEmployee
                label={"Second surname"}
                type={"secondSurname"}
                name={"secondSurname"}
                value={userData.secondSurname}
                id={"secondSurname"}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputEmployee
                label={"Identification"}
                type={"cedula"}
                name={"cedula"}
                value={userData.cedula}
                id={"cedula"}
                onChange={handleInputChange}
              />
              <InputEmployee
                label={"Phone Number"}
                type={"phoneNumber"}
                name={"phoneNumber"}
                value={userData.phoneNumber}
                id={"phoneNumber"}
                onChange={handleInputChange}
              />
            </div>

            <InputEmployee
              label={"Job Position"}
              type={"jobPosition"}
              name={"jobPosition"}
              value={userData.jobPosition}
              id={"jobPosition"}
              onChange={handleInputChange}
            />
            <InputEmployee
              label={"Salary for moth"}
              type={"salary"}
              name={"salary"}
              value={userData.salary}
              id={"salary"}
              onChange={handleInputChange}
            />
            <InputEmployee
              label={"Departments to belongs"}
              type={"idDepartment"}
              name={"idDepartment"}
              value={userData.idDepartment}
              id={"idDepartment"}
              onChange={handleInputChange}
            />
            <InputEmployee
              label={"Email"}
              type={"email"}
              name={"email"}
              value={userData.email}
              id={"Department"}
              onChange={handleInputChange}
            />
            <InputEmployee
              label={"Boss for whom he works"}
              type={"boss"}
              name={"boss"}
              value={userData.boss}
              id={"boss"}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Save
            </button>
            <button
              onClick={handleClear}
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-pink shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
