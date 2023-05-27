import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchDepartment } from "../../adminDepartment/SearchDepartment";
import { format, parseISO, getDay } from "date-fns";
import { Brands } from "@/root/interface/brands";
import BrandsClock from "../BrandsClock";

export const BrandsEmployee = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [hoursIni, setHoursIni] = useState("");
  const [formattedDay, setFormattedDay] = useState("");
  const [hoursFin, setHoursFin] = useState("");
  const [updateDateTime, setUpdateDateTime] = useState(false);
  const [brandData, setBrandData] = useState<Brands>({
    idEmployee: "",
    cycle: {},
    hoursEmployee: {},
  });

  useEffect(() => {
    const fetchCurrentDateTime = async () => {
      try {
        const response = await axios.get("http://worldtimeapi.org/api/ip");
        const { datetime } = response.data;
        const [date, time] = datetime.split("T");
        setCurrentDate(date);
        setCurrentTime(time.slice(0, 8));
      } catch (error) {
        console.error("Error getting date and time:", error);
      }
    };

    fetchCurrentDateTime();
  }, [updateDateTime]);

  const handleClick1 = () => {
    setUpdateDateTime(true);
    const weekday = getDateOfWeekday(currentDate);
    console.log(weekday);
    const hoursEmployee = brandData.hoursEmployee;

    if (hoursEmployee.hasOwnProperty(weekday)) {
      const hours = hoursEmployee[weekday];
      const hIni = hours.hIni;
      const hFin = hours.hFin;
      setHoursFin(hFin);
      setHoursIni(hIni);
    } else {
      console.log(`No information found for the day: ${weekday}`);
    }
  };

  const handleGetBrands = async (id: string) => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBrandData(data);
        console.log(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting brands data", error);
    }
  };

  const getDateOfWeekday = (newDate: string) => {
    const date = parseISO(newDate);
    const dayOfWeek = getDay(date);
    setFormattedDay(format(date, "EEEE"));
    console.log(formattedDay);

    return formattedDay;
  };

  const handleUpdateCycleHours = (cycleName: string) => {
    if (brandData && brandData.cycle && brandData.cycle[cycleName]) {
      const cycle = brandData.cycle[cycleName];
      const existingHours = cycle.hours[currentDate];

      if (existingHours) {
        const updatedCycle = {
          ...cycle,
          hours: {
            ...cycle.hours,
            [currentDate]: {
              ...existingHours,
              hFin: currentTime,
            },
          },
        };
        setBrandData((prevData: any) => ({
          ...prevData,
          cycle: {
            ...prevData.cycle,
            [cycleName]: updatedCycle,
          },
        }));
      } else {
        const previousDate = Object.keys(cycle.hours).pop();

        const updatedCycle = {
          ...cycle,
          hours: {
            ...cycle.hours,
            [currentDate]: {
              hIni: currentTime,
              hFin: previousDate ? cycle.hours[previousDate].hFin : "",
            },
          },
        };

        setBrandData((prevData: any) => ({
          ...prevData,
          cycle: {
            ...prevData.cycle,
            [cycleName]: updatedCycle,
          },
        }));
      }
    }
    console.log(brandData);
  };

  const checkMarkHours = (markStart: string, markEnd: string): boolean => {
    const markStartHour = Number(markStart.split(":")[0]);
    const markStartMinute = Number(markStart.split(":")[1]);

    const hoursIniHour = Number(hoursIni.split(":")[0]);
    const hoursIniMinute = Number(hoursIni.split(":")[1]);

    const hoursFinHour = Number(hoursFin.split(":")[0]);
    const hoursFinMinute = Number(hoursFin.split(":")[1]);

    if (!markEnd) {
      if (
        (hoursIni &&
          markStartHour === hoursIniHour &&
          markStartMinute === hoursIniMinute) ||
        markStartHour < hoursIniHour ||
        (markStartHour === hoursIniHour && markStartMinute < hoursIniMinute)
      ) {
        console.log("They match");
        return true;
      } else {
        console.log("The mark start hour does not match");
      }
    } else {
      const markEndHour = Number(markEnd.split(":")[0]);
      const markEndMinute = Number(markEnd.split(":")[1]);

      if (
        (hoursIni &&
          hoursFin &&
          markEndHour === hoursFinHour &&
          markEndMinute === hoursFinMinute) ||
        markEndHour > hoursFinHour ||
        (markEndHour === hoursFinHour && markEndMinute >= hoursFinMinute)
      ) {
        console.log("The hours match");
        return true;
      } else {
        console.log("The mark end hour does not match");
      }
    }

    return false;
  };

  return (
    <div>
      <BrandsClock
        currentDate={currentDate}
        currentTime={currentTime}
        hoursIni={hoursIni}
        formattedDay={formattedDay}
        hoursFin={hoursFin}
        updateDateTime={false}
        brandData={brandData}
        handleClick1={handleClick1}
        handleGetBrands={handleGetBrands}
        getDateOfWeekday={getDateOfWeekday}
        handleUpdateCycleHours={handleUpdateCycleHours}
        checkMarkHours={checkMarkHours}
        setBrandData={setBrandData}
      />
    </div>
  );
};
