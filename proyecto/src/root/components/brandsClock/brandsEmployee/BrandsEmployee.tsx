import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchDepartment } from "../../creationDeparment/SearchDepartment";
import { format, parseISO, getDay } from "date-fns";
import { Brands } from "@/root/interface/brands";
import BrandsClock from "../BrandsClock";
import { useSelector } from "react-redux";
import { selectLogin } from "@/root/redux";
import JustificationEmployee from "../../justification/JustificationEmployee";

export const BrandsEmployee = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [hoursIni, setHoursIni] = useState("");
  const [formattedDay, setFormattedDay] = useState("");
  const [hoursFin, setHoursFin] = useState("");
  const employeeLogin = useSelector(selectLogin);
  const [updateDateTime, setUpdateDateTime] = useState(false);
  const [initialLate, setInitialLate] = useState(false);
  const [finalDelay, setFinalDelay] = useState(false);
  const [markInitial, setMarkInitial] = useState("");
  const [markFinal, setMarkFinal] = useState("");
  const [finish, setFinish] = useState(false);
  const [brandData, setBrandData] = useState<Brands>({
    idEmployee: "",
    cycle: {},
    hoursEmployee: {},
  });

  useEffect(() => {
    const fetchDataAndDateOfWeekday = async () => {
      try {
        const response = await axios.get("http://worldtimeapi.org/api/ip");
        const { datetime } = response.data;
        const [date, time] = datetime.split("T");
        setCurrentDate(date);
        setCurrentTime(time.slice(0, 8));

        const parsedDate = parseISO(date);
        const formattedDay = format(parsedDate, "EEEE");
        console.log(formattedDay);
        setFormattedDay(formattedDay);
      } catch (error) {
        console.error("Error getting date and time:", error);
      }
    };

    fetchDataAndDateOfWeekday();
  }, [updateDateTime]);

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

  const handleUpdateCycleHours = async (cycleName: string) => {
    setUpdateDateTime(true);
    const weekday = formattedDay;
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

        setBrandData((prevData) => ({
          ...prevData,
          cycle: {
            ...prevData.cycle,
            [cycleName]: updatedCycle,
          },
        }));
      } else {
        const updatedCycle = {
          ...cycle,
          hours: {
            ...cycle.hours,
            [currentDate]: {
              hIni: currentTime,
              hFin: "",
            },
          },
        };

        setBrandData((prevData) => ({
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
    if (!markStart && !markEnd) {
      console.log("Both markStart and markEnd are required");
      return false;
    }

    if (!markEnd) {
      if (markStart) {
        const markStartHour = Number(markStart.split(":")[0]);
        const markStartMinute = Number(markStart.split(":")[1]);

        const hoursIniHour = Number(hoursIni.split(":")[0]);
        const hoursIniMinute = Number(hoursIni.split(":")[1]);

        if (
          markStartHour < hoursIniHour ||
          (markStartHour === hoursIniHour && markStartMinute < hoursIniMinute)
        ) {
          console.log(markStartHour, hoursIni);
          console.log("The mark start hour is earlier than hoursIni");
          return true;
        } else {
          console.log(markEnd);
          setInitialLate(true);
          setMarkInitial(markStart);
        }
      }
    } else if (markStart && markEnd) {
      const markEndHour = Number(markEnd.split(":")[0]);
      const markEndMinute = Number(markEnd.split(":")[1]);

      const hoursFinHour = Number(hoursFin.split(":")[0]);
      console.log(hoursFin);
      const hoursFinMinute = Number(hoursFin.split(":")[1]);

      if (
        markEndHour > hoursFinHour ||
        (markEndHour === hoursFinHour && markEndMinute >= hoursFinMinute)
      ) {
        console.log(markEndHour, hoursFin);
        console.log("The mark end hour is greater than or equal to hoursFin");
        return true;
      } else {
        console.log("me puse aqui");
        setFinalDelay(true);
        setMarkFinal(markEnd);
      }
    }

    return false;
  };

  useEffect(() => {
    if (employeeLogin?.uid) {
      handleGetBrands(employeeLogin?.uid);
    }
  }, [employeeLogin?.uid]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const date = new Date(currentDate);
    const month = date.getMonth() + 1;
    let monthCycle: number;

    if (month >= 1 && month <= 6) {
      monthCycle = 1;
    } else if (month >= 7 && month <= 12) {
      monthCycle = 2;
    } else {
      monthCycle = 0;
    }

    const year = new Date(currentDate).getFullYear();
    const nameCycle = monthCycle.toString() + year.toString();

    await handleUpdateCycleHours(nameCycle).then(async () => {
      if (formattedDay && brandData.cycle && brandData.cycle[nameCycle]) {
        const cycle = brandData.cycle[nameCycle];
        const existingHours = cycle.hours[currentDate];
        if (existingHours) {
          const markStart = existingHours.hIni;
          const markEnd = existingHours.hFin;
          console.log(markStart, markEnd);
          if (checkMarkHours(markStart, markEnd)) {
            console.log("The hours match. Performing update...");
          } else {
            console.log("The mark hours do not match the defined hours.");
          }

          try {
            const response = await fetch(
              `/api/brands/${brandData.idEmployee}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(brandData),
              }
            );
            console.log("PASE EL METODO PUT ", brandData);
            if (response.ok) {
              const updatedBrands = await response.json();
              setBrandData((prevData) => ({
                ...prevData,
                ...updatedBrands,
              }));
              setFinish(true);
              console.log("se termino el procese he guardado", finish);
            } else {
              throw new Error("Error updating brands");
            }
          } catch (error) {
            console.error("Error updating brands:", error);
          }
        }
      }
    });
  };
  return (
    <div>
      <div style={{ position: "relative" }}>
        {initialLate === true && finish === true ? (
          <JustificationEmployee
            hIni={markInitial}
            hFin={""}
            date={currentDate}
            uuid={brandData.idEmployee}
            style={{ position: "absolute", top: 0, left: 0 }}
            setFinish={setFinish}
          />
        ) : null}
        {finalDelay === true && finish === true ? (
          <JustificationEmployee
            hIni={""}
            hFin={markFinal}
            date={currentDate}
            uuid={brandData.idEmployee}
            style={{ position: "absolute", top: 0, left: 0 }}
            setFinish={setFinish}
          />
        ) : null}
      </div>
      {finish === false ||
      (finalDelay === false && finish) ||
      (initialLate === true && finish) ? (
        <BrandsClock handleUpdate={handleUpdate} />
      ) : null}
    </div>
  );
};
