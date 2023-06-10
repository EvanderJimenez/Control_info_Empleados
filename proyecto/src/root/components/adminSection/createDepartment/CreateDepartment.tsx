import React, { useEffect, useState } from "react";
import ListEmployeeDepart from "../../creationDeparment/listEmployeeDepart/ListEmployeeDepart";
import SearchEmployeeDepart from "../../creationDeparment/SearchEmployeeDepart/SearchEmployeeDepart";
import ComboVoxSubDepartments from "../../creationDeparment/comboVoxSubDepartments/ComboVoxSubDepartments";
import InputDepartment from "../../creationDeparment/input/InputDepartment";
import toast from "react-hot-toast";
import { DepartmentType } from "@/root/types/Department.type";
import { EmployeesType } from "@/root/types/Employee.type";
import { useDispatch, useSelector } from "react-redux";
import {
  StartUpDateEmployee,
  selectGetAllDepartment,
  selectGetEmployeeByUid,
  startCreateDepartment,
  startGetAllDepartment,
} from "@/root/redux";
import { resetByVariableAdmin } from "@/root/redux/reducers/employee-reducer/getByVariableAdmin/getByVariableAdminReducer";
import { initialDepartmet } from "@/root/constants/department/department.constants";
import { resetEmployeeByUid } from "@/root/redux/reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer";
import { Department } from "@/root/interface/departments";

const CreateDepartment = () => {
  const dispatch = useDispatch();
  const employeeUid = useSelector(selectGetEmployeeByUid);
  const departmentsList = useSelector(selectGetAllDepartment);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");
  const [isSubDepartment, setIsSubDepartment] = useState(false);

  const [departmentNew, setDepartmentNew] =
    useState<DepartmentType>(initialDepartmet);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDepartmentNew((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClear = () => {
    setDepartmentNew(initialDepartmet);
    setIsSubDepartment(false)
    setSelectedOption("");
    setName("");
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (departmentNew && departmentNew.name.length > 0) {
      const newData: Department = {
        ...departmentNew,
        namesubDepartment: selectedOption,
        subDepartment: name,
      };

   
      dispatch(startCreateDepartment(newData));
     handleClear()
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubDepartment(event.target.checked);
    if (!event.target.checked) {
      setSelectedOption("");
      setName("");
    }
  };
  useEffect(() => {
    if (departmentsList.length === 0) {
      dispatch(startGetAllDepartment());
    
    }
    console.log(departmentsList);
  }, []);
  -useEffect(() => {
    if (departmentsList) {
      setDepartments(departmentsList);
    }
  }, [departmentsList]);

  return (
    <>
      <h2 className="text-xl text-center text-darkBlue font-bold">
        Create new department
      </h2>

      <div className="bg-lithGray mx-auto max-w-xl sm:mt-20 min-h-screen pb-5">
        <form
          className="bg-white shadow-md rounded  flex flex-col space-y-2 mb-8 "
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <InputDepartment
              label="Name Department"
              type="name"
              name="name"
              value={departmentNew.name}
              id="name"
              onChange={handleInputChange}
            />
            <InputDepartment
              label="Size of Department"
              type="number"
              name="size"
              value={departmentNew.size}
              id="size"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <InputDepartment
              label="Location"
              type="location"
              name="location"
              value={departmentNew.location}
              id="location"
              onChange={handleInputChange}
            />
            <InputDepartment
              label="Area Belongs"
              type="level"
              name="level"
              value={departmentNew.level}
              id="level"
              onChange={handleInputChange}
            />
          </div>
          <div className="p-3 justify-center"></div>
          <div className="p-3 flex justify-center">
            <label className="block text-md font-semibold mb-4">
              Is Sub department?
              <input
                type="checkbox"
                checked={isSubDepartment}
                onChange={handleCheckboxChange}
                className="ml-2"
              />
            </label>
          </div>
          {isSubDepartment && (
            <div className="flex flex-wrap pb-4 items-center justify-between">
              <div>
                <label className="block text-md font-semibold mb-4">
                  Sub department
                </label>
                <input
                  type="text"
                  name="subDepartment"
                  value={name}
                  id="subDepartment"
                  readOnly
                  className="w-full focus:outline-none"
                />
              </div>
              <ComboVoxSubDepartments
                items={departments}
                label="Select sub department"
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setName={setName}
              />
            </div>
          )}
          <div className="flex justify-center  mb-5">
            <div className="w-full flex justify-between md:w-1/2 px-3 mb-6 md:mb-0">
              <button onClick={handleClear} className="bg-darkBlue ">
                Clear
              </button>
              <button type="submit" className="bg-darkBlue ">
                Create new
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDepartment;
