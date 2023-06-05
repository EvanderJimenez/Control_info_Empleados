import { PendingRequestJustifications } from "@/root/interface/employee";
import {
  StarGetEmployeesByIdDepartment,
  selectGetEmployeesByIdDepartment,
  selectLogin,
  StartGetEmployeeByUid,
  selectGetByVariable,
} from "@/root/redux";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RequestEmployeeProps {
  selectedRequest: any;
  option: string;
}

let listEmployees: EmployeesType[];

const ListRequestJustification = ({
  option,
  selectedRequest,
}: RequestEmployeeProps) => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const variable = useSelector(selectGetByVariable);
  const listEmployee = useSelector(selectGetEmployeesByIdDepartment);
  const [pendingRequests, setPendingRequests] = useState<
    PendingRequestJustifications[]
  >([]);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment(loginState?.idDepartment || ""));
  }, [option]);

  useEffect(() => {
    if (listEmployees) {
      const pendingRequestsList: PendingRequestJustifications[] = [];

      listEmployees.forEach((employee) => {
        const employeeName: string = employee.name;
        const employeeUID: string = employee.uid;
        const attendance = employee.attendance;

        if (attendance) {
          Object.entries(attendance).forEach(([key, value]) => {
            const {
              endTime,
              startTime,
              justificationFin,
              justificationIni,
              state,
            } = value;

            if (state == "waiting") {
              const pendingRequest: PendingRequestJustifications = {
                key: key.toString(),
                employeeName,
                employeeUID,
                startTime,
                endTime,
                justificationFin,
                justificationIni,
                state,
              };
              pendingRequestsList.push(pendingRequest);
            }
          });
        }
      });
      setPendingRequests(pendingRequestsList);
    }
  }, [listEmployees]);

  const handleLoadInformation = (request: PendingRequestJustifications) => {
    dispatch(StartGetEmployeeByUid(request?.employeeUID || ""));
    selectedRequest(request);
  };

  if (variable.length > 0) {
    listEmployees = variable;
  } else if (listEmployee.length > 0) {
    listEmployees = listEmployee;
  }

  return (
    <div className="shadow-lg space-y-5 overflow-auto h-72 w-full p-4">
      {pendingRequests.map(
        (request: PendingRequestJustifications, index: number) => (
          <div
            key={index}
            className="p-5 shadow-lg flex-col space-y-3 flex bg-lithBlue bg-opacity-40  rounded"
          >
            <h3 className="text-md text-center font-semibold  mb-2">
              Employee: {request.employeeName}
            </h3>
            <p className="font-semibold text-center">Date: {request.key}</p>
            <button
              className="bg-darkBlue"
              onClick={() => handleLoadInformation(request)}
            >
              Load information
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default ListRequestJustification;
