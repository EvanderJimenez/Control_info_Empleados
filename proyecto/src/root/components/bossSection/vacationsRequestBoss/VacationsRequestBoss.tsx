import React, { useEffect, useLayoutEffect, useState } from "react";
import Filters from "./components/filters/Filters";
import ListRequestVacations from "./components/listRequestVacations/ListRequestVacations";
import { useDispatch, useSelector } from "react-redux";
import { selectGetEmployeeByUid, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { PendingRequest } from "@/root/interface/employee";
import { ResetEmployeeByUid, StartGetEmployeeByUid, StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import {
  initialDataEmployee,
  pendingRequest,
} from "@/root/constants/employee/employee.constants";
import { toast } from "react-hot-toast";
import FormAcceptDenied from "./components/formAcceptDenied/FormAcceptDenied";
import { resetByVariable } from "@/root/redux/reducers/employee-reducer/getByVariable/GetByVariableReducer";

let optionSelect = "wait";

const VacationsRequestBoss = () => {
  const dispatch = useDispatch();
  const employeeByUid = useSelector(selectGetEmployeeByUid);
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest>();
  const [dataEmployee, setDataEmployee] =
    useState<EmployeesType>(initialDataEmployee);

  const handleAccept = async () => {
    if (selectedRequest) {
      dispatch(StartGetEmployeeByUid(selectedRequest.employeeUID));
      optionSelect = "accept";
      toast.success("Justification accepted");
    } else {
      toast.error("Information not loaded");
    }
  };

  const handleDenied = async () => {
    if (selectedRequest) {
      await dispatch(StartGetEmployeeByUid(selectedRequest?.employeeUID || ""));
      optionSelect = "denied";
      toast.success("Justification not accepted");
    } else {
      toast.error("Information not loaded");
    }
  };

  useEffect(() => {
    if (employeeByUid && employeeByUid.vacations && optionSelect !== "wait") {
      const vacation = employeeByUid.vacations[selectedRequest?.key || ""];

      const updatedVacation = { ...vacation, approved: optionSelect };

      const updatedVacations = {
        ...employeeByUid.vacations,
        [selectedRequest?.key || ""]: updatedVacation,
      };

      const updatedDataEmployee = {
        ...employeeByUid,
        vacations: updatedVacations,
      };

      setDataEmployee(updatedDataEmployee);

      if (dataEmployee.uid === undefined || "") {
        return;
      }

      dispatch(StartUpDateEmployee(updatedDataEmployee.uid, updatedDataEmployee));
      dispatch(ResetEmployeeByUid());
      dispatch(resetByVariable())
      optionSelect = "wait";
      setSelectedRequest(pendingRequest);
    }
  }, [employeeByUid, dispatch]);

  return (
    <>
      <h1 className="text-center text-darkBlue pb-5  text-lg font-bold">Approval or denial of vacation requests</h1>
      <div className="flex flex-col lg:flex-row overflow-hidden pb-14">
        <div className="w-full shadow-2xl lg:w-1/2">
          <div className="flex flex-col mb-3 ml-4 justify-center items-center">
            <Filters />
          </div>
          <div className="flex justify-center">
            <ListRequestVacations option={optionSelect} selectedRequest={setSelectedRequest} />
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 m-3">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="flex w-full justify-center space-x-5 items-center">
              <label className="text-center font-semibold">From: {selectedRequest?.employeeName || ""}</label>
              <label className="text-center font-semibold">Affair: {selectedRequest?.key || ""}</label>
            </div>
            <FormAcceptDenied
              handleAccept={handleAccept}
              handleDenied={handleDenied}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VacationsRequestBoss;
