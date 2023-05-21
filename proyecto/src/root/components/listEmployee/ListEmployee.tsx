import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartListOfEmployee, StartGetEmployeeByUid } from "../../redux/thunks/employee-thunk/employee.thunk";
import { RootState } from "../../redux/store";
import LoadingGeneralComponent from "../loadingGeneralComponent/LoadingGeneralComponent";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { EmployeesType } from "@/root/types/Employee.type";

interface NewList{
  newList: EmployeesType[]
}

const ListEmployee = ({newList}: NewList) => {
  const dispatch = useDispatch();


  const getEmployeeByUid = useSelector((state: RootState) => state.getEmployeeByUidStore.getEmployeeByUid);
  const loading = useSelector((state: RootState) => state.employeesListStore.loading);

  const loginState = useSelector(selectLogin);

  useEffect(() => {
    dispatch(StartListOfEmployee());
  }, [dispatch, getEmployeeByUid]);

  const handleLoad = (uid: string) => {
    dispatch(StartGetEmployeeByUid(uid));
  };

  const filteredEmployees = newList.filter((item) => item.enabled && item.idDepartment === loginState?.idDepartment && item.uid !== loginState?.uid);


  return (
    <div className="grid grid-cols-1 gap-4 scroll overflow-y-auto p-2vh h-96">
      {loading ? (
        <LoadingGeneralComponent />
      ) : (
        Array.isArray(filteredEmployees) &&
        filteredEmployees
          .filter((item) => item.enabled)
          .map((item) => (
            <React.Fragment key={item.uid}>
              {loading ? (
                <LoadingGeneralComponent />
              ) : (
                <div className="p-4 border border-gray-300 rounded-lg">
                  <p className="font-bold">Name: {item.name}</p>
                  <p className="mt-2">Cedula: {item.cedula}</p>
                  <p className="mt-2">Email: {item.email}</p>
                  <p className="mt-2">Job Positio: {item.jobPosition}</p>
                  <p className="mt-2">Department: {item.idDepartment}</p>

                  <button className="mt-4 px-4 py-2 bg-red-500 bg-blue text-white rounded hover:bg-red-600" onClick={() => handleLoad(item.uid)}>Load Information</button>
                </div>
              )}
            </React.Fragment>
          ))
      )}
    </div>
  );
};

export default ListEmployee;
