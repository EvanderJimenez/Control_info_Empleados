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
    //dispatch(resetByVariableAdmin);
    //dispatch(resetEmployeeByUid);
    //setDepartmentNew(initialDepartmet);

   
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (departmentNew && employeeUid && employeeUid?.uid !== "") {
      console.log(employeeUid);
      console.log(JSON.stringify(departmentNew));
      const newData: Department = {
        ...departmentNew,
        idEmployee: employeeUid.uid,  
        leader: employeeUid.name,
      };
      console.log(JSON.stringify(newData));
      dispatch(startCreateDepartment(newData));

      const updateEmployee : EmployeesType = {...employeeUid, idDepartment: newData.id,jobPosition: "boss"}

      dispatch(StartUpDateEmployee(updateEmployee?.uid, updateEmployee))
    }
  };

  useEffect(() => {
    if (departmentsList) {
      setDepartments(departmentsList);
    }
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-xl sm:mt-20 min-h-screen  ">
      <form
        className="bg-white shadow-md rounded  flex flex-col mb-8 "
        onSubmit={handleSubmit}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-lg leading-8 text-gray-600">
            Create New Department
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-2 px-2 pt-5 pd-5">
            Departments
          </h3>
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
        <div className="flex flex-wrap -mx-3 mb-2">
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
          <ComboVoxSubDepartments
            items={departments}
            label="Select sub Department"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 justify-center">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Boss
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
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
          />
          <>
            <div className="w-full h-full items-center justify-center">
              <span>Select Boss</span>
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
        <div className="flex justify-center -mx-3 mb-5">
          <div
            className="w-full flex justify-center md:w-1/2 px-3 mb-6 md:mb-0"
            onClick={handleClear}
          >
            <button className="bg-black m-3">Clear</button>
            <button
              type="submit"
              className="bg-darkBlue hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
            >
              Create New
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDepartment;
