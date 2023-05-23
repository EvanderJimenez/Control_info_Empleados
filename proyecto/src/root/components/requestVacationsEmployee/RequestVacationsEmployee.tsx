import { Vacations } from "@/root/interface/employee";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



html2pdf

const RequestVacationsEmployee = () => {
  const employeeVacations = useSelector(selectLogin);

/*   const [vacations, setVacations] = useState<Vacations[]>([
    { dateStart: "", dateEnd: "", description: "",name: "", approved: false },
  ]); */

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

  const [newDateStart, setNewDateStart] = useState("")
  const [newDateEnd, setNewDateEnd] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newName, setNewName] = useState("")


  const dispatch = useDispatch();

  const handleVacationRequestSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newName) {
      console.error("New date is empty");
      return;
    }
    const newVacations: Vacations = {

  dateStart : newDateStart,
  dateEnd: newDateEnd,
  description: newDescription,
  approved: false
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


    

    console.log(newVacations)
    console.log(dataEmployee.vacations)

    //const newDataEmployee = { ...dataEmployee, vacations: vacations };
    

    setNewDateStart("")
    setNewDateEnd("")
    setNewDescription("")

  };

  useEffect(() => {

    //dispatch(StartUpDateEmployee("Yi1cFJipKWXYs5aOOiebHHLu6qF3", dataEmployee));
    console.log(dataEmployee.vacations);
    console.log("DataEmployee " + dataEmployee)
  }, [dataEmployee]);

  useEffect(() => {
    if (employeeVacations) {
      setDataEmployee(employeeVacations);
    }
  }, [employeeVacations]);

  return (
    <>
    <form onSubmit={handleVacationRequestSend}>
    <div className="xl:w-1/2 space-y-4 flex flex-col lg:w-1/2 md:w-full px-8 py-6 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl font-medium  mb-2">
          Vacation request
        </h2>
        <div>
        <input
              type="text"
              id="name"
              value={newName}
              onChange={(e) =>
                setNewName(e.target.value)
              }
            />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-auto">
            <label htmlFor="dateStar">Initial application date</label>
            <input
              type="datetime-local"
              id="dateStar"
              value={newDateStart}
              onChange={(e) =>
                setNewDateStart(e.target.value)
              }
            />
          </div>
          <div className="flex flex-wrap w-auto">
            <label htmlFor="dateEnd">Application end date</label>
            <input
              type="datetime-local"
              id="dateEnd"
              value={newDateEnd}
              onChange={(e) =>
                setNewDateEnd(e.target.value)
              }
            />
          </div>
        </div>
        <textarea
          name="description"
          id="description"
          placeholder="Vacation request information"
          cols={29}
          rows={10}
          value={newDescription}
          onChange={(e) =>
            setNewDescription(e.target.value)
          }
        ></textarea>
        <button
          className="NormalButton zoom"
          type="submit"
        >
          Send request
        </button>
      </div>
    </form>

    </>
  );
};

export default RequestVacationsEmployee;
