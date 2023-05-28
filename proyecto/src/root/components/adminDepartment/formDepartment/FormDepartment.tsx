import React, { useState } from "react";
import Input from "../input/";
import { Department } from "@/root/interface/departments";
interface infoDepart {
  departmentsData: Department;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FormDepartment = ({
  departmentsData,
  handleSubmit,
  handleInputChange,
  ...props
}: infoDepart) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    setInputValue("");
  };

  return (
    <div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="sm:col-span-2">
          <Input
            label={"Name"}
            type={"name"}
            name={"name"}
            value={departmentsData.name}
            id={"name"}
            onChange={handleInputChange}
          />

          <Input
            label={"Identification Boss"}
            type={"leader"}
            name={"leader"}
            value={departmentsData.leader}
            id={"leader"}
            onChange={handleInputChange}
          />
          <Input
            label={"idEmployee"}
            type={"idEmployee"}
            name={"idEmployee"}
            value={departmentsData.idEmployee}
            id={"idEmployee"}
            onChange={handleInputChange}
          />
          <Input
            label={"Size of department"}
            type={"size"}
            name={"size"}
            value={departmentsData.size}
            id={"size"}
            onChange={handleInputChange}
          />
          <Input
            label={" Location "}
            type={"location"}
            name={"location"}
            value={departmentsData.location}
            id={"location"}
            onChange={handleInputChange}
          />
          <Input
            label={"Area  belongs"}
            type={"level"}
            name={"level"}
            value={departmentsData.level}
            id={"level"}
            onChange={handleInputChange}
          />
          <div>
            <link
              rel="stylesheet"
              href="https://unpkg.com/@themesberg/flowbite@1.1.0/dist/flowbite.min.css"
            />
            <label
              htmlFor="toggle-example"
              className="flex items-center cursor-pointer relative mb-4"
            >
              <input
                type="checkbox"
                id="toggle-example"
                className="sr-only"
                checked={isChecked}
                onChange={handleToggleChange}
              />
              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
              <span className="ml-3 text-gray-900 text-sm font-medium">
                Toggle me
              </span>
            </label>
            {isChecked && (
              <Input
                label={"Department belongs..."}
                type={"subDepartment"}
                name={"subDepartment"}
                value={departmentsData.subDepartment}
                id={"subDepartment"}
                onChange={handleInputChange}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue hover:bg-sky text-white font-bold py-2 px-4 rounded "
        >
          Save Department
        </button>
      </form>
    </div>
  );
};
