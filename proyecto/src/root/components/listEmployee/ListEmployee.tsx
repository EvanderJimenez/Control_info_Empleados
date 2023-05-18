import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfEmployee,
  deletingEmployee,
} from "../../redux/thunks/employee-thunk/employee.thunk";//TODO:You should use relative paths with @
import { RootState } from "../../redux/store";//TODO:You should use relative paths with @

const ListEmployee = () => {
  const dispatch = useDispatch();
  const employees = useSelector(
    (state: RootState) => state.employeesList.employees
  );
  const deletedEmployee = useSelector(
    (state: RootState) => state.generalStore.deleteEmployee
  );

  useEffect(() => {
    dispatch(listOfEmployee());
  }, [dispatch, deletedEmployee]);

  const handleDelete = (uid: string) => {
    dispatch(deletingEmployee(uid));
  };

  const handleUpdate = (uid: string) => {
    ///TODO
  };

  return (
    <div className="grid grid-cols-1 gap-4 scroll">
      <>
        {Array.isArray(employees) &&
          employees
            .filter((item) => item.enabled)
            .map((item) => (
              <div
                key={item.uid}
                className="p-4 border border-gray-300 rounded-lg"
              >
                <p className="font-bold">Name: {item.name}</p>
                <p className="mt-2">Cedula: {item.cedula}</p>
                <p className="mt-2">Email: {item.email}</p>
                <p className="mt-2">Department: {item.idDepartment}</p>
                <p className="mt-2">Boss: {item.boss}</p>
                <p className="mt-2">
                  Enabled:{" "}
                  <input readOnly type="checkbox" checked={item.enabled} />
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 bg-red text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(item.uid)}
                >
                  Delete
                </button>

                <button
                  className="mt-4 px-4 py-2 bg-red-500 bg-blue text-white rounded hover:bg-red-600"
                  onClick={() => handleUpdate(item.uid)}
                >
                  Update
                </button>
              </div>
            ))}
      </>
    </div>
  );
};

export default ListEmployee;
