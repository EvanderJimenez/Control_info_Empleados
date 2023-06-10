import React, { useEffect, useState } from "react";
import InputDepartment from "../input/InputDepartment";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetEmployeeByUid2,
  StartGetEmployeeByUid2,
  StartUpDateEmployee,
  selectGetAllDepartment,
  selectGetDepartmentById,
  selectGetEmployeeByUid,
  selectGetEmployeeByUid2,
  startUpdateDepartment,
} from "@/root/redux";
import ComboVoxSubDepartments from "../comboVoxSubDepartments/ComboVoxSubDepartments";
import { DepartmentType } from "@/root/types/Department.type";
import SearchEmployeeDepart from "../SearchEmployeeDepart/SearchEmployeeDepart";
import ListEmployeeDepart from "../listEmployeeDepart/ListEmployeeDepart";
import toast from "react-hot-toast";
import { EmployeesType } from "@/root/types/Employee.type";
import { initialDepartmet } from "@/root/constants/department/department.constants";
import { Department } from "@/root/interface/departments";
import { updateDepartmentByIdReducer } from "@/root/redux/reducers/department-reducer/updateDepartmentById/UpdateDepartmentByIdReducer";
import { resetEmployeeByUid } from "@/root/redux/reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer";

interface infoDepart {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FormEmployee = ({ departmentsData, ...props }: infoDepart) => {
  const dispatch = useDispatch();
  const dataDepart = useSelector(selectGetDepartmentById);
  const dataEmployeeUid2 = useSelector(selectGetEmployeeByUid2)

  const [update, setUpdate] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const departmentsList = useSelector(selectGetAllDepartment);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [nameSubDepartment, setNameSubDepartment] = useState("");
  const [leader, setLeader] = useState("");
  const [idLeader, setIdLeader] = useState("");
  const employeeUid = useSelector(selectGetEmployeeByUid);
  const [departmentNew, setDepartmentNew] =
    useState<DepartmentType>(initialDepartmet);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDepartmentNew((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClear = async () => {
    setDepartmentNew(initialDepartmet)
    setLeader("")
    setNameSubDepartment("")
    await dispatch(resetEmployeeByUid())
    await dispatch(ResetEmployeeByUid2())
  }

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (departmentNew && departmentNew.name.length > 0 && employeeUid) {
      const idDepartment = dataDepart.id;
      const upDateDepart: Department = {
        ...departmentNew,
        leader: leader,
        idEmployee: idLeader,
        namesubDepartment: nameSubDepartment,
        subDepartment:selectedOption
      };
      console.log(upDateDepart)
      await dispatch(startUpdateDepartment(upDateDepart.id, upDateDepart));

      if(departmentNew.idEmployee){
        console.log("enter333")
        await dispatch(StartGetEmployeeByUid2(departmentNew.idEmployee))
      }
      if(employeeUid && employeeUid.uid.length > 0){
        const updateEmployee: EmployeesType = {
          ...employeeUid,
          idDepartment: idDepartment,
          jobPosition: "boss",
        };
        console.log(updateEmployee)
       await dispatch(StartUpDateEmployee(updateEmployee?.uid, updateEmployee));
      }
      handleClear()
    } else {
      toast.error("select a department to update");
    }
  };

  useEffect(() => {
    if(dataEmployeeUid2 && dataEmployeeUid2.uid.length > 0) {
      console.log(dataEmployeeUid2)
      const newEmployee2 : EmployeesType = {...dataEmployeeUid2, jobPosition:"employee" }
      console.log(newEmployee2)
      dispatch(StartUpDateEmployee(newEmployee2.uid, newEmployee2))
    }
  }, [dataEmployeeUid2])

  useEffect(() => {
    if (dataDepart) {
      setDepartmentNew(dataDepart);
      if(dataDepart.subDepartment){
        setSelectedOption(dataDepart.subDepartment)
      }
      if(dataDepart.namesubDepartment){
        setNameSubDepartment(dataDepart.namesubDepartment)
      }
      if(dataDepart.leader){
        setLeader(dataDepart.leader)
      }
    }
  }, [dataDepart]);

  useEffect(() => {
    if (departmentsList) {
      setDepartments(departmentsList);
    }
  }, [dispatch]);

  useEffect(() => {
  
    if(employeeUid && employeeUid.name.length > 0){
      setLeader(employeeUid.name)
      setIdLeader(employeeUid.uid)
    }else if(dataDepart && dataDepart.leader !== ""){
      setLeader(dataDepart.leader)
      setIdLeader(dataDepart.subDepartment)
    }

  }, [dataDepart,employeeUid])

  return (
    <>
      <div className="mx-auto  text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-2 px-2 pt-5 pd-5">
          Departments
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Work departments are a fundamental part of any organization or
          company.
        </p>
      </div>
      <div className="flex flex-wrap ">
        <div className="md:w-1/2 px-3 mb-6">
          <form
            className="bg-white shadow-md rounded  flex flex-col mb-8 "
            onSubmit={handleUpdate}
          >
            <div className="flex justify-center items-center">
              <InputDepartment
                label="Name Department"
                type="name"
                name="name"
                value={departmentNew.name || ''}
                id="name"
                onChange={handleInputChange}
              />
              <InputDepartment
                label="Size of Department"
                type="number"
                name="size"
                value={departmentNew.size || ''}
                id="size"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap ">
              <div className="flex flex-row w-full">
                <InputDepartment
                  label="Location"
                  type="location"
                  name="location"
                  value={departmentNew.location || ''}
                  id="location"
                  onChange={handleInputChange}
                />
                <InputDepartment
                  label="Area Belongs"
                  type="level"
                  name="level"
                  value={departmentNew.level || ''}
                  id="level"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="block text-md font-semibold mb-4">
                  Sub department
                </label>
                <input
                  type="text"
                  name="subDepartment"
                  value={nameSubDepartment || ''}
                  id="subDepartment"
                  readOnly
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-center w-full">
                <div className="flex justify-center flex-col mb-5">
                  <ComboVoxSubDepartments
                    items={departments}
                    label="Select sub department"
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    setName={setNameSubDepartment}
                  />
                  <div className="w-full flex justify-center md:full px-3 mb-6 md:mb-0">
                    <button
                      type="submit"
                      className={`bg-darkBlue  text-white font-semibold py-2 px-4 rounded ${
                        update ? "" : ""
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

        <div className="w-full md:w-1/2 px-3  mb-6 ">
          <label className="block  text-md font-bold mb-2">Boss</label>
          <input
            type="text"
            name="boss"
            value={leader}
            id="boss"
            placeholder="Boss"
            readOnly
            className=" block w-full rounded py-3 px-4 leading-tight mb-2 focus:outline-none focus:bg-white"
          />
          <>
            <div className="w-full h-full items-center justify-center">
              <span className="text-darkBlue font-bold text-center text-md">
                {" "}
                <p>Select Boss</p>
              </span>
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
              <ListEmployeeDepart />
            </div>
          </>
          <></>
        </div>
      </div>
    </>
  );
};
