import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartListOfEmployee, StartGetEmployeeByUid } from "../../redux/thunks/employee-thunk/employee.thunk";
import { RootState } from "../../redux/store";
import LoadingGeneralComponent from "../loadingGeneralComponent/LoadingGeneralComponent";
import { selectLogin, selectgetByVariable } from "@/root/redux/selectors/employee-selector/employee.selector";
import { EmployeesType } from "@/root/types/Employee.type";

const ListEmployee = () => {
  const dispatch = useDispatch();
  let filteredEmployees: EmployeesType[] = [];

  const employeesListVariable = useSelector(selectgetByVariable);

  const getEmployeeByUid = useSelector((state: RootState) => state.getEmployeeByUidStore.getEmployeeByUid);
  const loading = useSelector((state: RootState) => state.employeesListStore.loading);

  const loginState = useSelector(selectLogin);

  useEffect(() => {
    dispatch(StartListOfEmployee());
  }, [dispatch, getEmployeeByUid]);

  const handleLoad = (uid: string) => {
    dispatch(StartGetEmployeeByUid(uid));
  };

  if (employeesListVariable) {
    filteredEmployees = employeesListVariable.filter((item) => item.enabled && item.idDepartment === loginState?.idDepartment && item.uid !== loginState?.uid);
  } else {
  }

  return (
    <div className="grid grid-cols-1 p-4 gap-4  p-2vh max-h-screen scroll overflow-y-auto h-56 border rounded-t-lg">
      {Array.isArray(employeesListVariable) &&
        employeesListVariable
          .filter((item) => item.enabled)
          .map((item) => (
            <div key={item.uid} className="border flex flex-col border-blue m-2 rounded-lg p-4">
              <p className="font-bold">Name: {item.name}</p>
              <p className="mt-2">Cedula: {item.cedula}</p>
              <p className="mt-2">Email: {item.email}</p>
              <p className="mt-2">Job Position: {item.jobPosition}</p>
              <p className="mt-2">Department: {item.idDepartment}</p>

              <button className="mt-4 px-4 py-2 bg-blue text-white rounded hover:bg-red-600" onClick={() => handleLoad(item.uid)}>
                Load Information
              </button>
            </div>
          ))}
      {loading && <LoadingGeneralComponent />}
    </div>
  );
};

export default ListEmployee;
