import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType, Vacations } from "@/root/types/Employee.type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListRequestVacations from "../employeeSection/requestVacationsEmployee/components/listRequestVacations/ListRequestVacations";


const RequestVacationsEmployee = () => {
  const employeeVacations = useSelector(selectLogin);

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
    attendance: {}
  });

  const [newDateStart, setNewDateStart] = useState("");
  const [newDateEnd, setNewDateEnd] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newName, setNewName] = useState("");

  const dispatch = useDispatch();

  const handleVacationRequestSend = (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="flex xl:h-screen flex-col lg:flex-row lg:flex-wrap justify-center items-center">
      <div className="lg:w-1/2 space-y-4 px-4 lg:px-0">
        <form onSubmit={handleVacationRequestSend}>
          <div className=" flex flex-col w-full lg:w-1/2 md:w-full border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl font-medium text-center mb-2">Vacation request</h2>
            <div className="items-center">
              <label className="font-semibold">Name request: </label>
              <input className="w-1/2" type="text" id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>

            <div className="w-auto flex flex-col space-y-2 items-center">
              <label htmlFor="dateStar">Start date</label>
              <input type="datetime-local" id="dateStar" value={newDateStart} onChange={(e) => setNewDateStart(e.target.value)} />
              <label htmlFor="dateEnd">Final date</label>
              <input type="datetime-local" id="dateEnd" value={newDateEnd} onChange={(e) => setNewDateEnd(e.target.value)} />
            </div>

            <textarea
              name="description"
              id="description"
              placeholder="Vacation request information"
              cols={29}
              rows={10}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
            <button className="NormalButton zoom" type="submit">
              Send request
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-1/2 space-y-4 w-full flex flex-col">
        <h2>List Request Vacations</h2>
        <div className="flex flex-row">
          <button className="bg-darkBlue">Accepted</button>
          <button className="bg-darkBlue">Denied</button>
        </div>
        <ListRequestVacations data={dataEmployee} filter="" setSendRequest={() => {}  }/>
      </div>
    </div>
  );
};

export default RequestVacationsEmployee;
