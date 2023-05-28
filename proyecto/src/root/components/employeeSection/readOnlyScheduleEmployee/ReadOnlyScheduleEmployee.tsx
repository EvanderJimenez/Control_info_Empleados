import React, { useEffect, useState } from "react";
import Schedule from "../../registerEmployee/components/schedule/Schedule";
import FormScheduleEmployee from "./components/FormScheduleEmployee";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { getBrandsByDocIdReducer } from "@/root/redux/reducers/brands-reducer/getBrandsByDocId/GetBrandsByDocIdReducer";
import { startGetBrandsByIdDoc } from "@/root/redux";

const ReadOnlyScheduleEmployee = () => {
  const employeeSchedule = useSelector(selectLogin);

  const handleGetBrands = async (id: string): Promise<Schedule[]> => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: any = await response.json();


        const hoursEmployee: Record<string, any> = data.hoursEmployee;

        const scheduleList: Schedule[] = Object.entries(hoursEmployee).map(([day, schedule]: [string, Record<string, string>]) => {
          return {
            day,
            startTime: schedule.hIni,
            endTime: schedule.hFin,
          };
        });

        return scheduleList;
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting brands data", error);
      return [];
    }
  };


  const brands = handleGetBrands(employeeSchedule.uid);

  const [schedules, setSchedules] = useState<Schedule[]>([
    { day: "Monday", startTime: "", endTime: "" },
    { day: "Tuesday", startTime: "", endTime: "" },
    { day: "Wednesday", startTime: "", endTime: "" },
    { day: "Thursday", startTime: "", endTime: "" },
    { day: "Friday", startTime: "", endTime: "" },
    { day: "Saturday", startTime: "", endTime: "" },
    { day: "Sunday", startTime: "", endTime: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (employeeSchedule?.uid) {
        const schedules = await handleGetBrands(employeeSchedule.uid);
        setSchedules(schedules);
      }
    };
  
    fetchData();
  }, [employeeSchedule]);

  return (
    <div>
      <FormScheduleEmployee schedules={schedules} />
    </div>
  );
};

export default ReadOnlyScheduleEmployee;

