import { Vacations } from "@/root/interface/employee";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequestVacationsEmployee = () => {
  const employeeVacations = useSelector(selectLogin);

  const [vacations, setVacations] = useState<Vacations[]>([
    { dateStart: "", dateEnd: "", description: "", approved: false },
  ]);

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
  });

  const dispatch = useDispatch();

  const handleVacationRequestSend = () => {
    const newDataEmployee = { ...dataEmployee, vacations: vacations };

    console.log("vacation "+ JSON.stringify(newDataEmployee.vacations))

    //dispatch(StartUpDateEmployee("", newDataEmployee));
  };

  useEffect(() => {
    if (employeeVacations) {
      setDataEmployee(employeeVacations);
    }
  }, [employeeVacations]);

  return (
    <>
      <div className="xl:w-1/2 space-y-4 flex flex-col lg:w-1/2 md:w-full px-8 py-6 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl font-medium  mb-2">
          Vacation request
        </h2>
        <div className="flex justify-center items-center">
          <div className="w-auto">
            <label htmlFor="dateStar">Initial application date</label>
            <input
              type="datetime-local"
              id="dateStar"
              value={vacations[0].dateStart}
              onChange={(e) =>
                setVacations([{ ...vacations[0], dateStart: e.target.value }])
              }
            />
          </div>
          <div className="flex flex-wrap w-auto">
            <label htmlFor="dateEnd">Application end date</label>
            <input
              type="datetime-local"
              id="dateEnd"
              value={vacations[0].dateEnd}
              onChange={(e) =>
                setVacations([{ ...vacations[0], dateEnd: e.target.value }])
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
          value={vacations[0].description}
          onChange={(e) =>
            setVacations([{ ...vacations[0], description: e.target.value }])
          }
        ></textarea>
        <button
          className="NormalButton zoom"
          onClick={handleVacationRequestSend}
        >
          Send request
        </button>
      </div>
    </>
  );
};

export default RequestVacationsEmployee;
