import React, { useEffect, useState } from "react";
import Filters from "../vacationsRequestBoss/components/filters/Filters";
import ListRequestJustification from "./components/listRequestJustification/ListRequestJustification";
import { PendingRequestJustifications } from "@/root/interface/employee";
import { useDispatch, useSelector } from "react-redux";
import {
  StartGetEmployeeByUid,
  StartUpDateEmployee,
  selectGetEmployeeByUid,
  ResetEmployeeByUid,
} from "@/root/redux";
import { EmployeesType } from "@/root/types/Employee.type";
import {
  initialDataEmployee,
  pendingRequestJustification,
} from "@/root/constants/employee/employee.constants";
import FormAcceptDeniedJustification from "./components/formAccetpDenied/FormAcceptDeniedJustification";

let optionSelect = "wait";

const JustificationRequest = () => {
  const dispatch = useDispatch();
  const [selectedRequest, setSelectedRequest] =
    useState<PendingRequestJustifications>();
  const employeeByUid = useSelector(selectGetEmployeeByUid);

  const [dataEmployee, setDataEmployee] =
    useState<EmployeesType>(initialDataEmployee);

  const handleAccept = async () => {
    dispatch(StartGetEmployeeByUid(selectedRequest?.employeeUID || ""));
    optionSelect = "accept";
  };

  const handleDenied = async () => {
    dispatch(StartGetEmployeeByUid(selectedRequest?.employeeUID || ""));
    optionSelect = "denied";
  };

  useEffect(() => {
    if (employeeByUid && employeeByUid.attendance && optionSelect !== "wait") {
      const attendance = employeeByUid.attendance[selectedRequest?.key || ""];

      const updatedAttendance = { ...attendance, state: optionSelect };

      const updatedAttendances = {
        ...employeeByUid.attendance,
        [selectedRequest?.key || ""]: updatedAttendance,
      };

      const updatedDataEmployee = {
        ...employeeByUid,
        attendance: updatedAttendances,
      };

      setDataEmployee(updatedDataEmployee);

      if (updatedDataEmployee.uid === undefined || "" || null) {
        return;
      }

      dispatch(
        StartUpDateEmployee(updatedDataEmployee.uid, updatedDataEmployee)
      );

      optionSelect = "wait";
      dispatch(ResetEmployeeByUid());
      setSelectedRequest(pendingRequestJustification);
      
      setSelectedRequest(pendingRequestJustification);
    }
  }, [employeeByUid, dispatch]);

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden pb-14">
      <div className="w-full lg:w-1/4 p-3">
        <div className="flex flex-col mb-3 items-center">
          <Filters />
        </div>
        <div>
          <ListRequestJustification
            option={optionSelect}
            selectedRequest={setSelectedRequest}
          />
        </div>
      </div>
      <div className="w-full lg:w-3/4 p-3">
        <div className="flex flex-col lg:flex-row justify-around items-center mb-3">
          <label className="font-semibold text-center">
            From: {selectedRequest?.employeeName || ""}
          </label>
          <label className="font-semibold text-center">
            Date: {selectedRequest?.key || ""}
          </label>
        </div>
        <FormAcceptDeniedJustification
          handleAccept={handleAccept}
          handleDenied={handleDenied}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      </div>
    </div>
  );
};

export default JustificationRequest;
