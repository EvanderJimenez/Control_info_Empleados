import React from "react";
import ComboVoxSubDepartments from "../comboVoxSubDepartments/ComboVoxSubDepartments";
import InputDepartment from "../input/InputDepartment";
import { DepartmentType } from "@/root/types/Department.type";

interface ForDepartment{
    handleUpdate: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) =>void
    departmentNew: DepartmentType;
    setDepartmentNew: React.Dispatch<React.SetStateAction<DepartmentType>>;
    nameSubDepartment: string;
    setNameSubDepartment: React.Dispatch<React.SetStateAction<string>>;
    departments: DepartmentType[];
    setDepartments: React.Dispatch<React.SetStateAction<DepartmentType[]>>;
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;

}

const FormDepartment = ({...props}:ForDepartment) => {
  return (
    <>
      <div className="md:w-1/2 px-3 mb-6">
        <form
          className="bg-white shadow-md rounded  flex flex-col mb-8 "
          onSubmit={props.handleUpdate}
        >
          <div className="flex justify-center items-center">
            <InputDepartment
              label="Name Department"
              type="name"
              name="name"
              value={props.departmentNew.name || ""}
              id="name"
              onChange={props.handleInputChange}
            />
            <InputDepartment
              label="Size of Department"
              type="number"
              name="size"
              value={props.departmentNew.size || ""}
              id="size"
              onChange={props.handleInputChange}
            />
          </div>
          <div className="flex flex-wrap ">
            <div className="flex flex-row w-full">
              <InputDepartment
                label="Location"
                type="location"
                name="location"
                value={props.departmentNew.location || ""}
                id="location"
                onChange={props.handleInputChange}
              />
              <InputDepartment
                label="Area Belongs"
                type="level"
                name="level"
                value={props.departmentNew.level || ""}
                id="level"
                onChange={props.handleInputChange}
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="block text-md font-semibold mb-4">
                Sub department
              </label>
              <input
                type="text"
                name="subDepartment"
                value={props.nameSubDepartment || ""}
                id="subDepartment"
                readOnly
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-center w-full">
              <div className="flex justify-center flex-col mb-5">
                <ComboVoxSubDepartments
                  items={props.departments}
                  label="Select sub department"
                  selectedOption={props.selectedOption}
                  setSelectedOption={props.setSelectedOption}
                  setName={props.setNameSubDepartment}
                />
                <div className="w-full flex justify-center md:full px-3 mb-6 md:mb-0">
                  <button
                    type="submit"
                    className={`bg-darkBlue  text-white font-semibold py-2 px-4 rounded ${
                      props.update ? "" : ""
                    }`}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormDepartment;
