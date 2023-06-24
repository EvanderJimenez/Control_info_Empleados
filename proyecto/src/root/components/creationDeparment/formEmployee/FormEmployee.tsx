import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetEmployeeByUid2,
  StartGetEmployeeByUid2,
  StartUpDateEmployee,
  selectGetAllDepartment,
  selectGetDepartmentById,
  selectGetEmployeeByUid,
  selectGetEmployeeByUid2,
  startGetAllDepartment,
  startUpdateDepartment,
} from "@/root/redux";
import { DepartmentType } from "@/root/types/Department.type";
import SearchEmployeeDepart from "../SearchEmployeeDepart/SearchEmployeeDepart";
import ListEmployeeDepart from "../listEmployeeDepart/ListEmployeeDepart";
import toast from "react-hot-toast";
import { EmployeesType } from "@/root/types/Employee.type";
import { initialDepartmet } from "@/root/constants/department/department.constants";
import { Department } from "@/root/interface/departments";
import { resetEmployeeByUid } from "@/root/redux/reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer";
import FormDepartment from "../formDepartment/FormDepartment";

interface infoDepart {
  departmentsData: Department;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FormEmployee = ({ departmentsData, ...props }: infoDepart) => {
  const dispatch = useDispatch();
  const dataDepart = useSelector(selectGetDepartmentById);
  const dataEmployeeUid2 = useSelector(selectGetEmployeeByUid2);

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
  //TODO: This code has a nested innecesary complexity, consider split in a new useHook
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDepartmentNew((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClear = async () => {
    setDepartmentNew(initialDepartmet);
    setLeader("");
    setNameSubDepartment("");
    await dispatch(resetEmployeeByUid());
    await dispatch(ResetEmployeeByUid2());
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (departmentNew && departmentNew.name.length > 0 && employeeUid) {
      const idDepartment = dataDepart.id;
      const upDateDepart: Department = {
        ...departmentNew,
        leader: leader,
        idEmployee: idLeader,
        namesubDepartment: nameSubDepartment,
        subDepartment: selectedOption,
      };

      await dispatch(startUpdateDepartment(upDateDepart.id, upDateDepart));

      if (departmentNew.idEmployee) {
        await dispatch(StartGetEmployeeByUid2(departmentNew.idEmployee));
      }
      if (employeeUid && employeeUid.uid.length > 0) {
        const updateEmployee: EmployeesType = {
          ...employeeUid,
          idDepartment: idDepartment,
          jobPosition: "boss",
        };

        await dispatch(
          StartUpDateEmployee(updateEmployee?.uid, updateEmployee)
        );
      }
      handleClear();
      return;
    }
    toast.error("select a department to update");
  };

  useEffect(() => {
    if (departmentsList.length === 0) {
      dispatch(startGetAllDepartment());
    }
  }, []);

  useEffect(() => {
    if (dataEmployeeUid2 && dataEmployeeUid2.uid.length > 0) {
      const newEmployee2: EmployeesType = {
        ...dataEmployeeUid2,
        jobPosition: "employee",
      };
      dispatch(StartUpDateEmployee(newEmployee2.uid, newEmployee2));
    }
  }, [dataEmployeeUid2]);

  useEffect(() => {
    if (dataDepart) {
      setDepartmentNew(dataDepart);
      if (dataDepart.subDepartment) {
        setSelectedOption(dataDepart.subDepartment);
      }
      if (dataDepart.namesubDepartment) {
        setNameSubDepartment(dataDepart.namesubDepartment);
      }
      if (dataDepart.leader) {
        setLeader(dataDepart.leader);
      }
    }
  }, [dataDepart]);

  useEffect(() => {
    if (departmentsList) {
      setDepartments(departmentsList);
    }
  }, [departmentsList]);

  useEffect(() => {
    if (employeeUid && employeeUid.name.length > 0) {
      setLeader(employeeUid.name);
      setIdLeader(employeeUid.uid);
    } else if (dataDepart && dataDepart.leader !== "") {
      setLeader(dataDepart.leader);
      setIdLeader(dataDepart.subDepartment);
    }
  }, [dataDepart, employeeUid]);

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
        <>
          <FormDepartment
            departmentNew={departmentNew}
            departments={departments}
            handleInputChange={handleInputChange}
            handleUpdate={handleUpdate}
            nameSubDepartment={nameSubDepartment}
            selectedOption={selectedOption}
            setDepartmentNew={setDepartmentNew}
            setDepartments={setDepartments}
            setNameSubDepartment={setNameSubDepartment}
            setSelectedOption={setSelectedOption}
            setUpdate={setUpdate}
            update={update}
          />
        </>

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
