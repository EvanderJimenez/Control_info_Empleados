import { PendingRequestJustifications } from "@/root/interface/employee";
import {
  StarGetEmployeesByIdDepartment,
  selectGetEmployeesByIdDepartment,
  selectLogin,
} from "@/root/redux";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RequestEmployeeProps {
  selectedRequest: any;
}

const ListRequestJustification = ({
  selectedRequest,
}: RequestEmployeeProps) => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const [pendingRequests, setPendingRequests] = useState<
    PendingRequestJustifications[]
  >([]);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment(loginState?.idDepartment || ""));
  }, []);

  useEffect(() => {
    if (listEmployees) {
      const pendingRequestsList: PendingRequestJustifications[] = [];

      listEmployees.forEach((employee) => {
        const employeeName: string = employee.name;
        const employeeUID: string = employee.uid;
        const attendance = employee.attendance;

        if (attendance) {
          Object.entries(attendance).forEach(([key, value]) => {
            const { endTime, startTime, justificationFin, justificationIni, state } = value;

            if (state == "waiting") {
              const pendingRequest: PendingRequestJustifications = {
                key: key.toString(),
                employeeName,
                employeeUID,
                startTime,
                endTime,
                justificationFin,
                justificationIni,
                state
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
    selectedRequest(request);
  };

  return (
    <div className="shadow-lg space-y-5 overflow-auto h-72 w-full p-4">
    {pendingRequests.map((request: PendingRequestJustifications, index: number) => (
      <div key={index} className="p-5 shadow-lg flex-col space-y-3 flex bg-lithBlue bg-opacity-40  rounded">
        <h3 className="text-md text-center font-semibold  mb-2">Employee: {request.employeeName}</h3>
        <p className="font-semibold text-center">Date: {request.key}</p>
        <button className="bg-darkBlue" onClick={() => handleLoadInformation(request)}>
          Load information
        </button>
      </div>
    ))}
  </div>
  );
};

export default ListRequestJustification;
