import { PendingRequest } from "@/root/interface/employee";
import {
  selectGetEmployeesByIdDepartment,
  selectLogin,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetEmployeesByIdDepartment, StartGetEmployeeByUid } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface  RequestEmployeeProps{
  dataEmployee: EmployeesType
  selectedRequest: any;
}

const ListRequestVacations = ({selectedRequest,dataEmployee} : RequestEmployeeProps) => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment(loginState?.idDepartment || ""));
  }, []);

  useEffect(() => {
    if (listEmployees) {
      const pendingRequestsList: PendingRequest[] = [];

      listEmployees.forEach((employee) => {
        const employeeName: string = employee.name;
        const employeeUID: string = employee.uid;
        const vacations = employee.vacations;

        if (vacations) {
          Object.entries(vacations).forEach(([key, value]) => {
            const { approved, dateEnd, dateStart, description } = value;

            if (approved == "waiting") {
              const pendingRequest: PendingRequest = {
                key: key.toString(),
                employeeName,
                employeeUID,
                dateStart,
                dateEnd,
                description,
                approved
              };
              pendingRequestsList.push(pendingRequest);
            }
          });
        }
      });
      setPendingRequests(pendingRequestsList);
    }
    console.log("Data received: " + JSON.stringify(dataEmployee))
  }, [listEmployees,pendingRequests]);

  const handleLoadInformation = (request: PendingRequest) => {

    selectedRequest(request);

  };


  return (
    <div className="bg-gray-100 p-4">
      {pendingRequests.map((request: PendingRequest, index: number) => (
        <div key={index} className="mb-4 p-2 border border-gray-300 rounded">
          <h3 className="text-lg font-semibold mb-2">
            Employee: {request.employeeName}
          </h3>
          <p className="text-gray-600">Name request: {request.key}</p>
          <button className="bg-darkBlue" onClick={() => handleLoadInformation(request)}>Load Information</button>
        </div>
      ))}
    </div>
  );
};

export default ListRequestVacations;
