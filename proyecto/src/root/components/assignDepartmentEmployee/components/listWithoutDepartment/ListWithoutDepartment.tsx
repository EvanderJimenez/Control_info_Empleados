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
    if(employeesWithoutDepart.length === 0 || change) {
      dispatch(StarGetEmployeesByIdDepartment("0"));
      console.log(employeesWithoutDepart)
    }
    console.log(employeesWithoutDepart)
  }, [dispatch, change]);

  return (
    <div className="container h-96 overflow-auto w-auto space-y-2 m-2 shadow-xl">
      {listEmployees ? (
        <div>
          {listEmployees.length > 0 ? (
            <div>
              <ul>
                {listEmployees.map((employee) => (
                  <div className=" p-4" key={employee.uid}>
                    <li className="shadow-md bg-lithBlue bg-opacity-40 space-y-2 p-2">
                      <p className="mb-1 flex justify-center font-semibold">
                        <span className="font-bold text-darkBlue"> {employee.name}</span>{" "}

                      </p>
                      <p className="mb-1 flex justify-center space-x-2" title="cedula of employee">
                        <img src="/Images/idCard.png" alt="card" />
                        <span className="font-semibold"></span>{" "}
                        {employee.cedula}
                      </p>
                      <p className="mb-1 flex justify-center items-center space-x-2" title="email of employee">
                        <img src="/Images/emailBlackIcon.png" alt="email" />
                        <span className="font-semibold">
                        </span>{" "}
                        {employee.email}
                      </p>
                      <div className="flex justify-center space-x-2" title="Phone of employee">
                        <img src="/Images/phone.png" alt="phone" />
                        <span className="font-semibold"></span>{" "}
                        {employee.phoneNumber}
                      </div>

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
