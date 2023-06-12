import { PendingRequest } from "@/root/interface/employee";
import { selectGetByVariable, selectGetByVariable2, selectGetEmployeesByIdDepartment, selectGetEmployeesByIdDepartmentJustifications, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetEmployeesByIdDepartment, StarGetEmployeesByIdDepartmentJustifications, StartGetEmployeeByUid } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RequestEmployeeProps {
  selectedRequest: any;//TODO: Type all variables that you use
  option: string
}


let listEmployees : EmployeesType[]

const ListRequestVacations = ({option, selectedRequest }: RequestEmployeeProps) => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const variable = useSelector(selectGetByVariable2);
  const listEmployee = useSelector(selectGetEmployeesByIdDepartmentJustifications);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);


  if(variable && variable.length > 0){
    listEmployees = variable
  }else if(listEmployee && listEmployee.length > 0){
    listEmployees = listEmployee
  }

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartmentJustifications(loginState?.idDepartment || ""));
  }, [option]);

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
                approved,
              };
              pendingRequestsList.push(pendingRequest);
            }
          });
        }
      });
      setPendingRequests(pendingRequestsList);
    }
  }, [listEmployees]);

  const handleLoadInformation = (request: PendingRequest) => {
    dispatch(StartGetEmployeeByUid(request.employeeUID || ""));
    selectedRequest(request);
  };

  return (
    <div className="shadow-lg overflow-auto h-72 w-1/2 p-4">
      {pendingRequests.length > 0 ? (
        pendingRequests.map((request: PendingRequest, index: number) => (
          <div key={index} className="p-2 shadow-lg justify-center flex-col space-y-4 flex bg-lithBlue bg-opacity-40">
            <h3 className="text-md text-center font-bold text-darkBlue  mb-2">{request.employeeName}</h3>
            <p className="font-semibold text-center">Affair: {request.key}</p>
            <p className="font-semibold text-center">State: {request.approved}</p>
            <button className="bg-darkBlue" onClick={() => handleLoadInformation(request)}>
              Load information
            </button>
          </div>
        ))
      ) : (
        <div className="flex justify-center text-bold text-lg text-darkBlue font-bold">List empty</div>
      )}
    </div>
  );
  
};

export default ListRequestVacations;