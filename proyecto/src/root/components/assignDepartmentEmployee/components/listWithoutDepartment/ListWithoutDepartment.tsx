import { StarGetEmployeesByIdDepartment, StartGetEmployeeByUid } from "@/root/redux";
import { selectGetEmployeesByIdDepartment, selectLogin } from "@/root/redux/selectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ListWithoutDepartmentProps {
  handleLoadEmployee: (uid: string) => Promise<void>;
  change: boolean;
}

const ListWithoutDepartment = ({ change, handleLoadEmployee }: ListWithoutDepartmentProps) => {
  const dispatch = useDispatch();
  const employeesListVacations = useSelector(selectLogin);
  const employeesWithoutDepart = useSelector(selectGetEmployeesByIdDepartment);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment("0"));
  }, [dispatch, employeesListVacations, change]);

  return (
    <div className="container h-96 overflow-auto w-full space-y-4">
     
      {employeesWithoutDepart ? (
        <div>
          {employeesWithoutDepart.length > 0 ? (
            <div>
              <ul>
                {employeesWithoutDepart.map((employee) => (
                  <div className=" p-4">
                    <li key={employee.uid} className="shadow-md bg-lithBlue bg-opacity-40  p-2">
                      <p className="mb-1">
                        <span className="font-semibold">Name:</span> {employee.name}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Cedula:</span> {employee.cedula}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Email:</span> {employee.email}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Phone number:</span> {employee.phoneNumber}
                      </p>
                      <div className="w-full pt-2 flex justify-center">
                        <button className="bg-darkBlue border-r-red" onClick={() => handleLoadEmployee(employee.uid)}>
                          Load information
                        </button>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-md font-bold text-center bg-yellow">Empty list 🤔</h2>
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
