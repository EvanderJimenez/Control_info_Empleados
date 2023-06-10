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
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");

  const [departmentNew, setDepartmentNew] =
    useState<DepartmentType>(initialDepartmet);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDepartmentNew((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClear = async () => {
    dispatch(resetByVariableAdmin);
    dispatch(resetEmployeeByUid);
    setDepartmentNew(initialDepartmet);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (departmentNew) {
      dispatch(startCreateDepartment(departmentNew));
    }
  };

  useEffect(() => {
    if (departmentsList) {
      setDepartments(departmentsList);
    }
  }, [dispatch]);

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
          <div className="p-3 justify-center">

          </div>
          <div className="flex flex-wrap mb-4 items-center justify-between">
            <div>
              <label className="block text-md font-semibold mb-4">
                Boss selected
              </label>
              <input
                type="text"
                name="boss"
                value={
                  employeeUid?.name +
                  " " +
                  employeeUid?.firstSurname +
                  " " +
                  employeeUid?.secondSurname || ""
                }
                id="boss"
                placeholder="Boss"
                readOnly
                className="w-full focus:outline-none"
              />
            </div>
            <ComboVoxSubDepartments
              items={departments}
              label="Select sub department"
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />


            <>
              <div className="w-full h-full">
                <span className="text-center justify-center flex text-darkBlue font-bold">Select Boss</span>
                <SearchEmployeeDepart
                  labelInputSeekerOne="text"
                  valueEnd={cedula}
                  placeholderSeekerOne="Cedula"
                  typeList="cedula"
                  id="cedula"
                />
                <SearchEmployeeDepart
                  labelInputSeekerOne="text"
                  valueEnd={name}
                  placeholderSeekerOne="Name"
                  typeList="name"
                  id="name"
                />
              </div>
            </>
            <>
              <ListEmployeeDepart />
            </>
          </div>
          <div className="flex justify-center  mb-5">
            <div
              className="w-full flex justify-between md:w-1/2 px-3 mb-6 md:mb-0"
              onClick={handleClear}
            >
              <button className="bg-darkBlue ">Clear</button>
              <button
                type="submit"
                className="bg-darkBlue "
              >
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
