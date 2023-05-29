import React, { useEffect, useState } from "react";
import Filters from "../vacationsRequestBoss/components/filters/Filters";
import ListRequestJustification from "./components/listRequestJustification/ListRequestJustification";
import { PendingRequestJustifications } from "@/root/interface/employee";
import { useDispatch,useSelector } from "react-redux";
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
  const [selectedRequest, setSelectedRequest] =
    useState<PendingRequestJustifications>();
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

      if(updatedDataEmployee.uid === undefined){
        return
      }

      dispatch(StartUpDateEmployee(dataEmployee.uid, dataEmployee));

      optionSelect = "wait";

      setSelectedRequest(pendingRequest)


    setSelectedRequest(pendingRequest);
    }
  }, [employeeByUid, dispatch]); 

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden pb-14">
      <div className="w-full lg:w-1/4">
        <div className="flex flex-col mb-3 justify-center items-center">
          <Filters />
        </div>
        <div>
          <ListRequestJustification  option={optionSelect} selectedRequest={setSelectedRequest} />
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2 md:w-1/2 sm:flex-col lg:3/4 w-full justify-center items-center m-3">
        <div className="flex w-full justify-center space-x-5  items-center">
          <label className="text-center font-semibold">
            From: {selectedRequest?.employeeName || ""}
          </label>
          <label className="text-center font-semibold ">
            Date: {selectedRequest?.key || ""}
          </label>
        </div>
        <section className="w-full xl:w-3/4 flex flex-col justify-center items-center">
          <div className="flex flex-row space-x-3 mb-3 justify-center items-center pt-3">
            <div>
              <label>Start Time: </label>
              <input
                type="text"
                id="dateStar"
                className="outline-none w-auto"
                value={selectedRequest?.startTime || ""}
                readOnly
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                type="text"
                className="outline-none w-auto"
                id="dateEnd"
                value={selectedRequest?.endTime || ""}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <textarea
              className="font-semibold w-full shadow-xl rounded-md outline-none"
              name="description"
              id="description"
              placeholder="Justifications request information"
              cols={7}
              rows={7}
              value={selectedRequest?.justificationIni || ""}
              readOnly
            ></textarea>
            <textarea
              className="font-semibold w-full shadow-xl rounded-md outline-none"
              name="description"
              id="description"
              placeholder="Justifications request information"
              cols={7}
              rows={7}
              value={selectedRequest?.justificationFin || ""}
              readOnly
            ></textarea>
          </div>
          <div className="flex flex-row justify-center space-x-2 sm:flex-row">
            <button className="bg-blue " onClick={handleAccept}>
              Accepted
            </button>
            <button onClick={handleDenied} className="bg-red ">
              Denied
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JustificationRequest;
