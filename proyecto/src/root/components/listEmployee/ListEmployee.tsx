import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOfEmployee, deletingEmployee, deleteEmployee } from "../../redux/thunks/employee-thunk/employee.thunk";
import { RootState } from "../../redux/store";
import LoadingGeneralComponent from "../loadingGeneralComponent/LoadingGeneralComponent";

const ListEmployee = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employeesList.employees);
  const deletedEmployee = useSelector((state: RootState) => state.generalStore.deleteEmployee);
  const loading = useSelector((state: RootState) => state.employeesList.loading);


  useEffect(() => {
    dispatch(listOfEmployee());
  }, []);

  const handleDelete = (uid: string) => {
    dispatch(deleteEmployee(uid));
  };

  const handleUpdate = (uid: string) => {
    ///TODO
  };

  return (
    <div className="grid grid-cols-1 gap-4 scroll">
      {loading ? (
        <LoadingGeneralComponent/>
      ) : (
        Array.isArray(employees) &&
        employees
          .filter((item) => item.enabled)
          .map((item) => (
            <React.Fragment key={item.uid}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="p-4 border border-gray-300 rounded-lg">
                  <p className="font-bold">Name: {item.name}</p>
                  <p className="mt-2">Cedula: {item.cedula}</p>
                  <p className="mt-2">Email: {item.email}</p>
                  <p className="mt-2">Department: {item.idDepartment}</p>
                  <p className="mt-2">Boss: {item.boss}</p>
                  <p className="mt-2">
                    Enabled: <input readOnly type="checkbox" checked={item.enabled} />
                  </p>
                  <button className="mt-4 px-4 py-2 bg-red-500 bg-red text-white rounded hover:bg-red-600" onClick={() => handleDelete(item.uid)}>
                    Delete
                  </button>
                  <button className="mt-4 px-4 py-2 bg-red-500 bg-blue text-white rounded hover:bg-red-600" onClick={() => handleUpdate(item.uid)}>
                    Update
                  </button>
                </div>
              )}
            </React.Fragment>
          ))
      )}
    </div>
  );
};

export default ListEmployee;
