import { StarGetEmployeesByIdDepartment, StartGetEmployeeByUid } from "@/root/redux";
import {
  selectGetEmployeesByIdDepartment,
  selectLogin,
} from "@/root/redux/selectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ListWithoutDepartmentProps {
    handleLoadEmployee: (uid: string) => Promise<void>;
  }

const ListWithoutDepartment = ({handleLoadEmployee} : ListWithoutDepartmentProps) => {
  const dispatch = useDispatch();
  const employeesListVacations = useSelector(selectLogin);
  const employeesWithoutDepart = useSelector(selectGetEmployeesByIdDepartment);



  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment("0"));
  }, [dispatch, employeesListVacations]);


  return (
    <div className="container mx-auto">
      {employeesWithoutDepart ? (
        <div>
          {employeesWithoutDepart.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Employees without Department:
              </h2>
              <ul>
                {employeesWithoutDepart.map((employee) => (
                  <li key={employee.uid} className="border-2 p-2">
                    <p className="mb-1">
                      <span className="font-semibold">Name:</span>{" "}
                      {employee.name}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Cedula:</span>{" "}
                      {employee.cedula}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Email:</span>{" "}
                      {employee.email}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Phone Number:</span>{" "}
                      {employee.phoneNumber}
                    </p>
                    <button className="bg-blue border-r-red" onClick={() =>(handleLoadEmployee(employee.uid))}>Load Info</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">Empty List</h2>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default ListWithoutDepartment;
