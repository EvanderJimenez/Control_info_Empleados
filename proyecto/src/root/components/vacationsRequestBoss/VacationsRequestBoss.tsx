import React, { useEffect, useState } from "react";
import Filters from "./components/filters/Filters";
import ListRequestVacations from "./components/listRequest/ListRequestVacations";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetEmployeeByUid,
  selectLogin,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import { PendingRequest } from "@/root/interface/employee";
import {
  StartGetEmployeeByUid,
  StartUpDateEmployee,
} from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";

const VacationsRequestBoss = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
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
    vacations: {}
  });

  const handleAccept = async () => {
    dispatch(StartGetEmployeeByUid(selectedRequest?.employeeUID || ""));

  }

  useEffect(() => {

    if (employeeByUid && employeeByUid.vacations) {
      const vacation = employeeByUid.vacations[selectedRequest?.key || ''];
      const updatedVacation = { ...vacation, approved: "accepted" };

      const updatedVacations = {
        ...employeeByUid.vacations,
        [selectedRequest?.key || '']: updatedVacation,
      };

      const updatedDataEmployee = {
        ...employeeByUid,
        vacations: updatedVacations,
      };

      setDataEmployee(updatedDataEmployee)

      console.log("Name: " + JSON.stringify(dataEmployee.name));
      console.log("Email: " + JSON.stringify(dataEmployee.email));
      console.log("new DataEmployee: " + JSON.stringify(dataEmployee.vacations));

    }
    
    //dispatch(StartUpDateEmployee(dataEmployee.uid,dataEmployee))

  }, [employeeByUid,dispatch])

  return (
    <div className="flex flex-row">
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2>List Request</h2>
          <Filters />
        </div>
        <div>
          <ListRequestVacations selectedRequest={setSelectedRequest} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-3">
        <div className="flex flex-col justify-center items-center">
          <label className="">
            Name employee: {selectedRequest?.employeeName || ""}
          </label>
          <label>Name Request: {selectedRequest?.key || ""}</label>
        </div>
        <section className="xl:w-3/4 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center  p-3">
            <label>Date Start: </label>
            <input
              type="text"
              id="dateStar"
              value={selectedRequest?.dateStart || ""}
              readOnly
            />
            <label>Date Finish:</label>
            <input
              type="text"
              id="dateEnd"
              value={selectedRequest?.dateEnd || ""}
              readOnly
            />
          </div>
          <div>
            <textarea
              name="description"
              id="description"
              placeholder="Vacation request information"
              cols={29}
              rows={10}
              value={selectedRequest?.description || ""}
              readOnly
            ></textarea>
          </div>

          <div className="flex flex-row">
            <button className="bg-blue" onClick={handleAccept}>
              Accepted
            </button>
            <button className="bg-red">Denied</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VacationsRequestBoss;
