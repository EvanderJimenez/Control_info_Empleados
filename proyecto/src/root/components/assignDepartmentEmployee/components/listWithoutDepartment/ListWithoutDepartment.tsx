import {
  StarGetEmployeesByIdDepartment,
  StartGetEmployeeByUid,
} from "@/root/redux";
import {
  selectGetByVariable,
  selectGetByVariableAdmin,
  selectGetEmployeesByIdDepartment,
  selectLogin,
} from "@/root/redux/selectors";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ListWithoutDepartmentProps {
  handleLoadEmployee: (uid: string) => Promise<void>;
  change: boolean;
}

const ListWithoutDepartment = ({
  change,
  handleLoadEmployee,
}: ListWithoutDepartmentProps) => {
  const dispatch = useDispatch();
  const employeesListVacations = useSelector(selectLogin);
  const employeesWithoutDepart = useSelector(selectGetEmployeesByIdDepartment);
  const variable = useSelector(selectGetByVariableAdmin);

  const [listEmployees, setListEmployees] = useState<EmployeesType[]>([]);

  useEffect(() => {
    if (variable.length > 0) {
      const filteredArray = variable.filter(
        (employee) => employee.idDepartment === "0"
      );
      setListEmployees(filteredArray);
    } else if (employeesWithoutDepart && employeesWithoutDepart.length > 0) {
      setListEmployees(employeesWithoutDepart);
    }
  }, [variable, employeesWithoutDepart]);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment("0"));
  }, [dispatch, employeesListVacations, change]);

  return (
    <div className="container h-96 overflow-auto w-full space-y-4">
      {listEmployees ? (
        <div>
          {listEmployees.length > 0 ? (
            <div>
              <ul>
                {listEmployees.map((employee) => (
                  <div className=" p-4" key={employee.uid}>
                    <li className="shadow-md bg-lithBlue bg-opacity-40  p-2">
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
                        <span className="font-semibold">Phone number:</span>{" "}
                        {employee.phoneNumber}
                      </p>
                      <div className="w-full pt-2 flex justify-center">
                        <button
                          className="bg-darkBlue border-r-red"
                          onClick={() => handleLoadEmployee(employee.uid)}
                        >
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
              <h2 className="text-md font-bold text-center bg-yellow">
                Empty list 🤔
              </h2>
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
