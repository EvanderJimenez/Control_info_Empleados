import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StartListOfEmployee,
  StartGetEmployeeByUid,
} from "../../redux/thunks/employee-thunk/employee.thunk";
import { RootState } from "../../redux/store";
import LoadingGeneralComponent from "../loadingGeneralComponent/LoadingGeneralComponent";
import {
  selectLogin,
  selectGetByVariable,
  selectGetEmployeesByIdDepartment,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import {
  selectGetByIdDocDepartment,
  selectGetDepartmentById,
} from "@/root/redux";
import { EmployeesType } from "@/root/types/Employee.type";

interface ListClear {
  clear: boolean;
  setClear: React.Dispatch<React.SetStateAction<boolean>>;
  listEmployees: EmployeesType[];
  setListEmployees: React.Dispatch<React.SetStateAction<EmployeesType[]>>;
}

const ListEmployee = ({
  clear,
  listEmployees,
  setListEmployees,
  setClear,
}: ListClear) => {
  const dispatch = useDispatch();

  const listAllEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const employeesListVariable = useSelector(selectGetByVariable);
  const department = useSelector(selectGetByIdDocDepartment);

  const getEmployeeByUid = useSelector(
    (state: RootState) => state.getEmployeeByUidStore.getEmployeeByUid
  );
  const loading = useSelector((state: RootState) => state.loading.loading);

  const loginState = useSelector(selectLogin);

  const handleLoad = (uid: string) => {
    dispatch(StartGetEmployeeByUid(uid));
    setClear(false);
  };

  useEffect(() => {
    if (employeesListVariable.length > 0) {
      console.log("count 1");
      setListEmployees(employeesListVariable);
    } else if (listAllEmployees.length > 0) {
      console.log("count 2");
      setListEmployees(listAllEmployees);
    }
  }, [employeesListVariable, listAllEmployees]);

  return (
    <>
      {listEmployees.length > 0 ? (
        <div className="grid grid-cols-1 p-4 gap-4  p-2vh max-h-screen scroll overflow-y-auto h-80 shadow-xl bg-opacity-10 ">
          {Array.isArray(listEmployees) &&
            listEmployees
              .filter((item) => item.enabled && item.uid !== loginState.uid)
              .map((item) => (
                <div
                  key={item.uid}
                  className=" shadow-xl bg-lithBlue bg-opacity-40 flex flex-col zoom  m-2 rounded-md p-4"
                >
                  <p className="font-bold">Name: {item.name}</p>
                  <p className="mt-2 font-semibold">Cedula: {item.cedula}</p>
                  <p className="mt-2 font-semibold">Email: {item.email}</p>
                  <p className="mt-2 font-semibold">
                    Job Position: {item.jobPosition}
                  </p>
                  <p className="mt-2 font-semibold">
                    Department: {department?.name || ""}
                  </p>

                  <button
                    className="mt-4 px-4 py-2 bg-black text-white rounded "
                    onClick={() => handleLoad(item.uid)}
                  >
                    Load Information
                  </button>
                </div>
              ))}
          {loading && <LoadingGeneralComponent />}
        </div>
      ) : (
        <div className="bg-darkBlue w-auto h-full  justify-center items-center">
          {" "}
          <h2 className=" w-auto h-32 font-semibold text-center text-yellow ">
            List empty
          </h2>
        </div>
      )}
    </>
  );
};

export default ListEmployee;
