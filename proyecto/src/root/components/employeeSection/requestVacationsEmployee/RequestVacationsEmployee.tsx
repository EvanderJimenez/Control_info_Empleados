import { Vacations } from "@/root/interface/employee";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListRequestVacations from "./components/listRequestVacations/ListRequestVacations";
import InputFloatLabel from "../../ui/InputFloatLabel/InputFloatLabel";

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
    <div className="bg-lithGray flex xl:h-screen flex-col flex-wrap lg:flex-row lg:flex-wrap justify-center items-center">
      <div className="lg:w-1/2 items-center">
        <form className="m-5" onSubmit={handleVacationRequestSend}>
          <div className=" flex flex-col  md:w-full sm:w-full border-gray-200 ">
            <h2 className="text-lg sm:text-xl font-medium text-center mb-2">Vacation request</h2>
            <div className="items-center">
              <label className="font-semibold">Name request: </label>
              <input className="w-1/4 focus:outline-none " type="text" id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>

            <div className="w-auto flex justify-between lx:flex-row space-x-2 mt-5 items-center">
              <label htmlFor="dateStar">Start date:</label>
              <input className = "bg-white"type="datetime-local" id="dateStar" value={newDateStart} onChange={(e) => setNewDateStart(e.target.value)} />
              <label htmlFor="dateEnd">Final date:</label>
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
              className="mt-3 shadow-lg focus:border-transparent focus:outline-none  rounded-xl"
            ></textarea>
            <button className="NormalButton zoom mt-3 " type="submit">
              Send request
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-1/2 justify-center flex flex-col overflow-auto h-96">
        <h2 className="text-lg sm:text-xl font-medium text-center mb-8">List request vacations</h2>
        <ListRequestVacations />
        <div className="flex flex-row justify-center space-x-4  m-2">
          <button className="bg-darkBlue">Accepted</button>
          <button className="bg-red">Denied</button>
        </div>
      </div>
    </div>
  );
};

export default RequestVacationsEmployee;
