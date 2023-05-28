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
      <div className="grid min-h-screen place-items-center">
        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
          <form className="mt-6" onSubmit={upDate}>
            <div className="gap[10]">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                General Information
              </h4>
              <p className="mt-2 px-2 text-base text-gray-600">
                CrHome's team of employees is comprised of highly trained
                professionals committed to providing an exceptional experience
              </p>
            </div>

            <div className="flex justify-between gap-3">
              <span className="w-1/2">
                <InputEmployee
                  label={"Name"}
                  type={"name"}
                  name={"name"}
                  value={userData.name}
                  id={"name"}
                  onChange={handleInputChange}
                />
              </span>
              <span className="w-1/2">
                <InputEmployee
                  label={"First surname"}
                  type={"firstSurname"}
                  name={"firstSurname"}
                  value={userData.firstSurname}
                  id={"firstSurname"}
                  onChange={handleInputChange}
                />
              </span>
            </div>
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
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
