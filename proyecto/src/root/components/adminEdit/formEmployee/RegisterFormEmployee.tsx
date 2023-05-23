import React from "react";
import InputEmployee from "../inputEmployee/InputEmployee";
import { UserData } from "@/root/interface/employee";
interface EmployeesData {
  userData: UserData;
  upDate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterFormEmployee({
  userData,
  handleInputChange,
  upDate,
  ...props
}: EmployeesData) {
  return (
    <div>
      <form className="grid grid-cols-2 gap-4 px-2 w-full" onSubmit={upDate}>
        <InputEmployee
          label={"Name"}
          type={"name"}
          name={"name"}
          value={userData.name}
          id={"name"}
          onChange={handleInputChange}
        />

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
        <InputEmployee
          label={"Identification"}
          type={"cedula"}
          name={"cedula"}
          value={userData.cedula}
          id={"cedula"}
          onChange={handleInputChange}
        />
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
          className="bg-blue hover:bg-sky text-white font-bold py-2 px-4 rounded "
        >
          Update User
        </button>
      </form>
    </div>
  );
}
