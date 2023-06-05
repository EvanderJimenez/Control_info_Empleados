import { Department } from "@/root/interface/departments";
import React from "react";
import InputDepartment from "../input/InputDepartment";

interface infoDepart {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export const FormEmployee = ({
  handleSubmit,
  handleInputChange,
  departmentsData,
  ...props
}: infoDepart) => {
  return (
    <div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-2 px-2 pt-5 pd-5">
              Departments
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Work departments are a fundamental part of any organization or
              company.
            </p>
          </div>
          <div className="flex justify-center mt-5 mb-6">
            <InputDepartment
              label="Name Department"
              type="name"
              name="name"
              value={departmentsData.name}
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <InputDepartment
              label="Name Boss"
              type="leader"
              name="leader"
              value={departmentsData.leader}
              id="leader"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <InputDepartment
              label="Size of Department"
              type="number"
              name="size"
              value={departmentsData.size}
              id="size"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <InputDepartment
              label="Location"
              type="location"
              name="location"
              value={departmentsData.location}
              id="location"
              onChange={handleInputChange}
            />
            <InputDepartment
              label="Area Belongs"
              type="level"
              name="level"
              value={departmentsData.level}
              id="level"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center -mx-3 mb-6">
            <div className="w-full flex justify-center md:w-1/2 px-3 mb-6 md:mb-0">
              <button
                type="submit"
                className="bg-darkBlue hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
              >
                Save department
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
