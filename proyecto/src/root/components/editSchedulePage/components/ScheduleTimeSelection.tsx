import React, { useEffect, useState } from "react";
import Schedule from "../../registerEmployee/components/schedule/Schedule";
import SearchInput from "../../searchInput/SearchInput";
import ListEmployee from "../../listEmployee/ListEmployee";
import { selectGetEmployeeByUid } from "@/root/redux/selectors/employee-selector/employee.selector";
import { useDispatch, useSelector } from "react-redux";
import { StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType } from "@/root/types/Employee.type";

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

  const handleSaveSchadule = (event: React.FormEvent<HTMLFormElement>) => {
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
            <ListEmployee />
          </div>
        </div>
        <div className="flex-grow xl:w-3/4">
          <form onSubmit={handleSaveSchadule} className="relative overflow-x-auto">
            <table className="w-full text-sm text-left GrayTable">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Weekday
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Entry time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Exit time
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr key={index} className="border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                      {schedule.day}
                    </th>
                    <td className="px-6 py-4">
                      <input
                        className="border-y-2 focus:outline-none border-blue bg-transparent text-sm zoom block"
                        type="time"
                        value={schedule.startTime}
                        onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        className="border-y-2 focus:outline-none border-blue bg-transparent text-sm zoom block"
                        type="time"
                        value={schedule.endTime}
                        onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-2">
              <button className="NormalButton" type="submit">
                Save schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ScheduleTimeSelection;
