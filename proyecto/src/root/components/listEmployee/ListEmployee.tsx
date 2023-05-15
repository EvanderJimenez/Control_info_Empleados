import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOfEmployee,deletingEmployee  } from "../../redux/thunks/employee-thunk/employee.thunk";

import { RootState } from "../../redux/store";


const ListEmployee = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employeesList.employees);
  console.log(employees)


  useEffect(() => {
    dispatch(listOfEmployee());
  }, [dispatch]);

  const handleDelete = (uid: string) => {
   dispatch(deletingEmployee(uid));
 };

  const handleUpdate = (uid: string) => {
    ///TODO
  };



  return (
    <div className="grid grid-cols-1 gap-4 scroll">

        <>
          {Array.isArray(employees) && employees.map((item) => (
            <div key={item.uid} className="p-4 border border-gray-300 rounded-lg">
              <p className="font-bold">Nombre: {item.name}</p>
              <p className="mt-2">Cedula: {item.cedula}</p>
              <p className="mt-2">Correo: {item.email}</p>
              <p className="mt-2">Departamento: {item.idDepartment}</p>
              <p className="mt-2">Jefe: {item.boss}</p>
              <p className="mt-2">
                Habilitado: <input readOnly type="checkbox" checked={item.enabled} />
              </p>
              <button className="mt-4 px-4 py-2 bg-red-500 bg-red text-white rounded hover:bg-red-600" onClick={() => handleDelete(item.uid)}>
                Eliminar
              </button>

              <button className="mt-4 px-4 py-2 bg-red-500 bg-blue text-white rounded hover:bg-red-600" onClick={() => handleUpdate(item.uid)}>
                Actualizar
              </button>
            </div>
          ))}
        </>
    </div>
  );
};

export default ListEmployee;
