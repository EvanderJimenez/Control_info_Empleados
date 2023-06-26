import React, { useEffect, useState } from "react";
import FormScheduleEmployee from "./components/FormScheduleEmployee";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import {
  selectGetBrandsByIdEmployee,
  startGetBrandsByIdEmployee,
} from "@/root/redux";
import { Schedule } from "@/root/interface/employee";

interface HoursEmployee {
  hIni: string;
  hFin: string;
}


let scheduleList: Schedule[] = [];

const ReadOnlyScheduleEmployee = () => {
  const userLogin = useSelector(selectLogin);
  const dispatch = useDispatch();
  const brandsById = useSelector(selectGetBrandsByIdEmployee);

  useEffect(() => {
    dispatch(startGetBrandsByIdEmployee(userLogin.uid));
  }, []);

  useEffect(() => {
    if (brandsById) {
      const hoursEmployee: Record<string, HoursEmployee> = brandsById.hoursEmployee;//TODO: Type all variables that you use
      if (hoursEmployee) {
        scheduleList = Object.entries(hoursEmployee).map(
          ([day, schedule]: [string, HoursEmployee]) => {
            return {
              day,
              startTime: schedule.hIni,
              endTime: schedule.hFin,
            };
          }
        );
      }

      setSchedules(scheduleList);
    }
  }, [brandsById]);
 //TODO: This code has a nested innecesary complexity, consider split in a new file
  const [schedules, setSchedules] = useState<Schedule[]>([
    { day: "Monday", startTime: "", endTime: "" },
    { day: "Tuesday", startTime: "", endTime: "" },
    { day: "Wednesday", startTime: "", endTime: "" },
    { day: "Thursday", startTime: "", endTime: "" },
    { day: "Friday", startTime: "", endTime: "" },
    { day: "Saturday", startTime: "", endTime: "" },
    { day: "Sunday", startTime: "", endTime: "" },
  ]);

  return (
    <div>
      <FormScheduleEmployee schedules={schedules} />
    </div>
  );
};

export default ReadOnlyScheduleEmployee;
