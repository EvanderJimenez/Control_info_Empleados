import React, { useEffect, useState } from "react";
import Filters from "../vacationsRequestBoss/components/filters/Filters";
import ListRequestJustification from "./components/listRequestJustification/ListRequestJustification";
import { PendingRequestJustifications } from "@/root/interface/employee";
import { useDispatch, useSelector } from "react-redux";
import { StartGetEmployeeByUid, StartUpDateEmployee, selectGetEmployeeByUid } from "@/root/redux";
import { EmployeesType } from "@/root/types/Employee.type";

let optionSelect = "wait";

const pendingRequest: PendingRequestJustifications = {
  key: "",
  employeeName: "",
  employeeUID: "",
  startTime: "",
  endTime: "",
  justificationFin: "",
  justificationIni: "",
  state: "",
};

const JustificationRequest = () => {
  const dispatch = useDispatch();
  const [selectedRequest, setSelectedRequest] = useState<PendingRequestJustifications>();
  const employeeByUid = useSelector(selectGetEmployeeByUid);

  const [dataEmployee, setDataEmployee] = useState<EmployeesType>({
    uid: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    cedula: 0,
    phoneNumber: 0,
    photo: "",
    jobPosition: "",
    salary: 0,
    enabled: true,
    idDepartment: "",
    password: "",
    email: "",
    boss: "",
    schedule: [],
    vacations: {},
    attendance: {},
  });

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

      if (updatedDataEmployee.uid === undefined) {
        return;
      }

      dispatch(StartUpDateEmployee(dataEmployee.uid, dataEmployee));

      optionSelect = "wait";

      setSelectedRequest(pendingRequest);

      setSelectedRequest(pendingRequest);
    }
  }, [employeeByUid, dispatch]);

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden pb-14">
      <div className="w-full lg:w-1/4 p-3">
        <div className="flex flex-col mb-3 items-center">
          <Filters />
        </div>
        <div>
          <ListRequestJustification option={optionSelect} selectedRequest={setSelectedRequest} />
        </div>
      </div>
      <div className="w-full lg:w-3/4 p-3">
        <div className="flex flex-col lg:flex-row justify-around items-center mb-3">
          <label className="font-semibold text-center">From: {selectedRequest?.employeeName || ""}</label>
          <label className="font-semibold text-center">Date: {selectedRequest?.key || ""}</label>
        </div>
        <section className="w-full flex flex-col justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-start">
  <div className="w-full md:w-1/2 mb-4 md:mb-0">
    <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-3">
      <label>Start time: </label>
      <input type="text" id="dateStar" className="outline-none w-full md:w-auto" value={selectedRequest?.startTime || ""} readOnly />
    </div>
    <textarea
      className="font-semibold w-full shadow-lg rounded-sm outline-none mb-3"
      name="description"
      id="description"
      placeholder="Justifications request information"
      cols={30}
      rows={7}
      value={selectedRequest?.justificationIni || ""}
      readOnly
    ></textarea>
    <button onClick={handleDenied} className="bg-darkBlue text-white rounded py-2 px-4 w-full md:w-auto">
      Denied
    </button>
  </div>

  <div className="w-full md:w-1/2">
    <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-3">
      <label>End time:</label>
      <input type="text" className="outline-none w-full md:w-auto" id="dateEnd" value={selectedRequest?.endTime || ""} readOnly />
    </div>
    <textarea
      className="font-semibold w-full shadow-xl rounded-md outline-none"
      name="description"
      id="description"
      placeholder="Justifications request information"
      cols={30}
      rows={7}
      value={selectedRequest?.justificationFin || ""}
      readOnly
    ></textarea>
    <button className="bg-darkBlue text-white rounded py-2 px-4 w-full md:w-auto" onClick={handleAccept}>
      Accepted
    </button>
  </div>
</section>

      </div>
    </div>
  );
};

export default JustificationRequest;
