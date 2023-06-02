import React, { useEffect, useLayoutEffect, useState } from "react";
import Filters from "./components/filters/Filters";
import ListRequestVacations from "./components/listRequestVacations/ListRequestVacations";
import { useDispatch, useSelector } from "react-redux";
import { selectGetEmployeeByUid, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { PendingRequest } from "@/root/interface/employee";
import { ResetEmployeeByUid, StartGetEmployeeByUid, StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import { toast } from "react-hot-toast";

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
    if (selectedRequest) {
      dispatch(StartGetEmployeeByUid(selectedRequest.employeeUID));
      optionSelect = "accept";
      toast.success("Justificación aceptada");
    }else{
      toast.error("Information not loaded");

    }
  };

  const handleDenied = async () => {
    dispatch(StartGetEmployeeByUid(selectedRequest?.employeeUID || ""));
    optionSelect = "denied";
  };

  useLayoutEffect(() => {
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

      if (updatedDataEmployee.uid === undefined) {
        return;
      }

      dispatch(StartUpDateEmployee(dataEmployee.uid, dataEmployee));
      optionSelect = "wait";
      setSelectedRequest(pendingRequest);
    }
  }, [employeeByUid, dispatch]);

  return (
    <div className="flex flex-col lg:flex-row overflow-hidden pb-14">
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col mb-3 justify-center items-center">
          <Filters />
        </div>
        <div>
          <ListRequestVacations option={optionSelect} selectedRequest={setSelectedRequest} />
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 m-3">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex w-full justify-center space-x-5 items-center">
            <label className="text-center font-semibold">From: {selectedRequest?.employeeName || ""}</label>
            <label className="text-center font-semibold">Affair: {selectedRequest?.key || ""}</label>
          </div>
          <section className="w-full xl:w-3/4 flex flex-col justify-center items-center">
            <div className="flex flex-row space-x-3 mb-3 justify-center items-center pt-3">
              <div className="font-semibold text-darkBlue">
                <label>Start date: </label>
                <input type="text" id="dateStar" className="outline-none w-auto" value={selectedRequest?.dateStart || ""} readOnly />
              </div>
              <div className="font-semibold text-darkBlue">
                <label>End date:</label>
                <input type="text" className="outline-none w-auto" id="dateEnd" value={selectedRequest?.dateEnd || ""} readOnly />
              </div>
            </div>

            <div className="justify-center">
              <textarea
                className=" border-lithBlue border-2 resize-none  shadow-lg font-semibold w-full  outline-none"
                name="description"
                id="description"
                placeholder="Vacation request information"
                cols={40}
                rows={10}
                value={selectedRequest?.description || ""}
                readOnly
              ></textarea>
              <div className="flex flex-row justify-between w-full sm:flex-row">
                <button className="bg-darkBlue" onClick={handleAccept}>
                  Accepted
                </button>
                <button onClick={handleDenied} className="bg-darkBlue">
                  Denied
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VacationsRequestBoss;
