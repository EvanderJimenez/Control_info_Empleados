import React, { useEffect, useState } from "react";
import Filters from "./components/filters/Filters";
import ListRequestVacations from "./components/listRequest/ListRequestVacations";
import { useDispatch, useSelector } from "react-redux";
import { selectGetEmployeeByUid, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { PendingRequest } from "@/root/interface/employee";
import { ResetEmployeeByUid, StartGetEmployeeByUid, StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";

let optionSelect = "wait";

const pendingRequest: PendingRequest = {
  key: "",
  employeeName: "",
  employeeUID: "",
  dateStart: "",
  dateEnd: "",
  description: "",
  approved: "",
};

const VacationsRequestBoss = () => {
  const dispatch = useDispatch();
  const employeeByUid = useSelector(selectGetEmployeeByUid);
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest>();
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
    console.log("option: " + optionSelect);
  };

  const handleDenied = async () => {
    dispatch(StartGetEmployeeByUid(selectedRequest?.employeeUID || ""));
    optionSelect = "denied";
    console.log("option: " + optionSelect);
  };

  useEffect(() => {
    console.log("option: " + optionSelect);

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

      console.log("Status :" + JSON.stringify(updatedDataEmployee.vacations));

      dispatch(StartUpDateEmployee(dataEmployee.uid, dataEmployee));
      //dispatch(ResetEmployeeByUid())

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
          <ListRequestVacations selectedRequest={setSelectedRequest} />
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2 md:w-1/2 sm:flex-col lg:3/4 w-full justify-center items-center m-3">
        <div className="flex w-full justify-center space-x-5  items-center">
          <label className="text-center font-semibold">From: {selectedRequest?.employeeName || ""}</label>
          <label className="text-center font-semibold ">Affair: {selectedRequest?.key || ""}</label>
        </div>
        <section className="w-full xl:w-3/4 flex flex-col justify-center items-center">
          <div className="flex flex-row space-x-3 mb-3 justify-center items-center pt-3">
            <div>
              <label>Start date: </label>
              <input type="text" id="dateStar" className="outline-none w-auto" value={selectedRequest?.dateStart || ""} readOnly />
            </div>
            <div>
              <label>End date:</label>
              <input type="text" className="outline-none w-auto" id="dateEnd" value={selectedRequest?.dateEnd || ""} readOnly />
            </div>
          </div>

          <div className="justify-center">
            <textarea
              className="font-semibold w-full shadow-xl rounded-md outline-none"
              name="description"
              id="description"
              placeholder="Vacation request information"
              cols={40}
              rows={10}
              value={selectedRequest?.description || ""}
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

export default VacationsRequestBoss;
