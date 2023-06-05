import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType, Vacations } from "@/root/types/Employee.type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListRequestVacations from "./components/listRequestVacations/ListRequestVacations";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import FormVacations from "./components/formVacations/FormVacations";

const RequestVacationsEmployee = () => {
  const employeeVacations = useSelector(selectLogin);

  const [sendRequest, setSendRequest] = useState(true);

  const [dataEmployee, setDataEmployee] =
    useState<EmployeesType>(initialDataEmployee);

  const [newDateStart, setNewDateStart] = useState("");
  const [newDateEnd, setNewDateEnd] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newName, setNewName] = useState("");

  const dispatch = useDispatch();

  const handleVacationRequestSend = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!newName) {
      return;
    }
    const newVacations: Vacations = {
      dateStart: newDateStart,
      dateEnd: newDateEnd,
      description: newDescription,
      approved: "waiting",
    };

    setDataEmployee((prevUserData) => {
      const updatedVacations = {
        ...prevUserData.vacations,
        [newName]: newVacations,
      };

      return {
        ...prevUserData,
        vacations: updatedVacations,
      };
    });

    setNewDateStart("");
    setNewDateEnd("");
    setNewDescription("");
    setNewName("");
    setSendRequest(!sendRequest);
  };

  useEffect(() => {
    if (dataEmployee?.uid != "") {
      dispatch(StartUpDateEmployee(employeeVacations?.uid || "", dataEmployee));
    }
  }, [dataEmployee]);

  useEffect(() => {
    if (employeeVacations) {
      setDataEmployee(employeeVacations);
    }
  }, [employeeVacations]);

  const FilterByAccepted = () => {
    setShowBy("accept");
  };
  const FilterByDenied = () => {
    setShowBy("denied");
  };
  const FilterByWaiting = () => {
    setShowBy("waiting");
  };
  const [showBy, setShowBy] = useState("waiting");

  return (
    <div className="bg-lithGray flex xl:h-screen xl:flex-col flex-col lg:flex-row lg:flex-wrap mt-10">
      <div className="lg:w-1/2 items-center">
        <FormVacations
          handleVacationRequestSend={handleVacationRequestSend}
          newDateEnd={newDateEnd}
          newDateStart={newDateStart}
          newDescription={newDescription}
          newName={newName}
          setNewDateEnd={setNewDateEnd}
          setNewDateStart={setNewDateStart}
          setNewDescription={setNewDescription}
          setNewName={setNewName}
        />
      </div>
      <div className="lg:w-1/2 justify-center flex flex-col overflow-auto h-96">
        <h2 className="text-lg sm:text-xl font-medium text-center mb-8">
          List request vacations
        </h2>
        <ListRequestVacations
          data={dataEmployee}
          setSendRequest={setSendRequest}
          filter={showBy}
        />
        <div className="flex flex-row justify-center space-x-4 mb-10 m-2">
          <button onClick={FilterByAccepted} className="bg-darkBlue">
            Accepted
          </button>
          <button onClick={FilterByDenied} className="bg-darkBlue">
            Denied
          </button>
          <button onClick={FilterByWaiting} className="bg-blue">
            Waiting
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestVacationsEmployee;
