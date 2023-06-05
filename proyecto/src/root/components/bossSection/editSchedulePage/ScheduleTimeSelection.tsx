import React, { useEffect, useState } from "react";
import Schedule from "../../registerEmployee/components/schedule/Schedule";
import SearchInput from "../../ui/searchInput/SearchInput";
import ListEmployee from "../../listEmployee/ListEmployee";
import { selectGetEmployeeByUid } from "@/root/redux/selectors/employee-selector/employee.selector";
import { useDispatch, useSelector } from "react-redux";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";
import FormSchedule from "./components/formSchedule/FormSchedule";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";

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

  const [dataEmployee, setDataEmployee] = useState<EmployeesType>(initialDataEmployee);

  const handleTimeChange = (index: number, field: "startTime" | "endTime", value: string) => {
    setSchedules((prevSchedules) => {
      const updatedSchedules = [...prevSchedules];
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
      return updatedSchedules;
    });
  };

  const handleSaveSchedule = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDataEmployee = { ...dataEmployee, schedule: schedules };

    dispatch(StartUpDateEmployee(newDataEmployee?.uid || "", newDataEmployee));

    setDataEmployee(initialDataEmployee);
  };
  return (
    <div className="flex flex-wrap mt-2 justify-center">
      
      <div className="flex-grow xl:w-1/2 md:w-1/2 px-2">
        <FormSchedule handleSaveSchedule={handleSaveSchedule} handleTimeChange={handleTimeChange} schedules={schedules} setSchedules={setSchedules} />
      </div>
      <div className="xl:w-1/2 md:w-1/2 px-2">
        <SearchInput labelInputSeekerOne="number" placeholderSeekerOne="ID number" valueEnd={""} typeList={"cedula"} id={"cedula"} />
        <div className="pt-3">
          <ListEmployee clear setClear={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleTimeSelection;
