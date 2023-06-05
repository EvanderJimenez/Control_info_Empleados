import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingGeneralComponent from "../../loadingGeneralComponent/LoadingGeneralComponent";
import {
  selectLogin,
  selectGetByVariable,
  selectGetEmployeeByUid,
  selectGetByVariableAdmin,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import { RootState } from "@/root/redux";

interface ListClear {
  setPassIdEmployee: (id: string) => void;
  setIdNameEmployee: (name: string) => void;
}

const ListEmployeeDepart = ({
  setPassIdEmployee,
  setIdNameEmployee,
  ...props
}: ListClear) => {
  const dispatch = useDispatch();

  const employeesListVariable = useSelector(selectGetByVariableAdmin);

  const getEmployeeByUid = useSelector(selectGetEmployeeByUid);
  const loading = useSelector(selectLogin);

  const loginState = useSelector(selectLogin);
  const handleLoad = (uid: string, name: string) => {
    setPassIdEmployee(uid);
    setIdNameEmployee(name);
  };

  return (
    <>
      {employeesListVariable.length > 0 ? (
        <div className="grid grid-cols-1 p-4 gap-4 p-2vh max-h-screen overflow-y-auto h-190 shadow-xl bg-opacity-10">
          {Array.isArray(employeesListVariable) &&
            employeesListVariable
              .filter((item) => item.enabled && item.uid !== loginState.uid)
              .map((item) => (
                <div
                  key={item.uid}
                  className="shadow-xl bg-lithBlue bg-opacity-40 flex flex-col zoom m-2 rounded-md p-4"
                >
                  <p className="font-bold">Name: {item.name}</p>
                  <p className="mt-2 font-semibold">Cedula: {item.cedula}</p>
                  <p className="mt-2 font-semibold">Email: {item.email}</p>
                  <p className="mt-2 font-semibold">
                    Job Position: {item.jobPosition}
                  </p>

                  <button
                    className="mt-4 px-4 py-2 bg-black text-white rounded"
                    onClick={() => handleLoad(item.uid, item.name)}
                  >
                    Pass Id Employee
                  </button>
                </div>
              ))}
          {loading && <LoadingGeneralComponent />}
        </div>
      ) : (
        <h2 className="font-semibold">List Empty</h2>
      )}
    </>
  );
};

export default ListEmployeeDepart;
