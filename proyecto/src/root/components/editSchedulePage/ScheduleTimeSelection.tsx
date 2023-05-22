import React, { useEffect, useState } from "react";
import Schedule from "../registerEmployee/components/schedule/Schedule";
import SearchInput from "../searchInput/SearchInput";
import ListEmployee from "../listEmployee/ListEmployee";
import { selectGetEmployeeByUid } from "@/root/redux/selectors/employee-selector/employee.selector";
import { useDispatch, useSelector } from "react-redux";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import FormSchedule from "./components/formSchedule/FormSchedule";

interface ScheduleTimeSelectionProps {
  onScheduleChange: (schedules: Schedule[]) => void;
}

const ScheduleTimeSelection: React.FC<ScheduleTimeSelectionProps> = ({ onScheduleChange }) => {

  const employeeSchedule = useSelector(selectGetEmployeeByUid);

  const dispatch = useDispatch();
  

  const [schedules, setSchedules] = useState<Schedule[]>([
    { day: "Monday", startTime: "", endTime: "" },
    { day: "Tuesday", startTime: "", endTime: "" },
    { day: "Wednesday", startTime: "", endTime: "" },
    { day: "Thursday", startTime: "", endTime: "" },
    { day: "Friday", startTime: "", endTime: "" },
    { day: "Saturday", startTime: "", endTime: "" },
    { day: "Sunday", startTime: "", endTime: "" },
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

  const handleTimeChange = (index: number, field: "startTime" | "endTime", value: string) => {
    setSchedules((prevSchedules) => {
      const updatedSchedules = [...prevSchedules];
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
      return updatedSchedules;
    });
  };

  useEffect(() => {
    if (employeeSchedule) {
      setSchedules(employeeSchedule.schedule);
      setDataEmployee(employeeSchedule);

    }
  }, [employeeSchedule]);

  const handleSaveSchedule = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDataEmployee = { ...dataEmployee, schedule: schedules };

    dispatch(StartUpDateEmployee(newDataEmployee?.uid || "", newDataEmployee));

  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="xl:w-1/4 ">
          <SearchInput labelInputSeekerOne="number" placeholderSeekerOne="ID number" valueEnd={""} typeList={"cedula"} id={"cedula"} />
          <div className="pt-3">
            <ListEmployee clear setClear={() => {}} />
          </div>
        </div>
        <div className="flex-grow xl:w-3/4">
          <FormSchedule handleSaveSchadule={handleSaveSchedule} handleTimeChange={handleTimeChange} schedules={schedules} setSchedules={setSchedules} />
        </div>
      </div>
    </>
  );
};

export default ScheduleTimeSelection;
