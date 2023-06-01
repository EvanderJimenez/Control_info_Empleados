import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO, getDay } from "date-fns";
import { Brands } from "@/root/interface/brands";
import BrandsClock from "../BrandsClock";
import { useSelector } from "react-redux";
import { selectLogin } from "@/root/redux";
import JustificationEmployee from "../../justification/JustificationEmployee";
import { toast } from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  let localHoursIni: string;
  let localHoursFin: string;
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

        setFormattedDay(formattedDay);
      } catch (error) {
        toast.error("Error getting date and time:");
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
      } else {
        toast.error("Error acquiring information");
      }
    } catch (error) {
      toast.error("Error getting brands data");
    }
  };

  const handleUpdateCycleHours = async (cycleName: string) => {
    setUpdateDateTime(true);
    const weekday = formattedDay;
    const hoursEmployee = brandData.hoursEmployee;

    if (hoursEmployee.hasOwnProperty(weekday)) {
      const { hIni, hFin } = hoursEmployee[weekday];
      setHoursFin(hFin);
      setHoursIni(hIni);
      localHoursIni = hIni;
      localHoursFin = hFin;
    } else {
      toast.error(`No information found for the day: ${weekday}`);
      return;
    }

    if (!brandData?.cycle?.[cycleName]) {
      return;
    }

    const cycle = brandData.cycle[cycleName];
    const existingHours = cycle.hours[currentDate];
    const updatedHours = existingHours
      ? { ...existingHours, hFin: currentTime }
      : { hIni: currentTime, hFin: "" };

    const updatedCycle = {
      ...cycle,
      hours: {
        ...cycle.hours,
        [currentDate]: updatedHours,
      },
    };

    return new Promise((resolve, reject) => {
      setBrandData((prevData) => {
        const updatedBrandData = {
          ...prevData,
          cycle: {
            ...prevData.cycle,
            [cycleName]: updatedCycle,
          },
        };
        resolve(updatedBrandData);
        return updatedBrandData;
      });
    });
  };

  const checkMarkHours = (markStart: string, markEnd: string): boolean => {
    let hoursIni = localHoursIni;
    let hoursFin = localHoursFin;
    if (!markStart && !markEnd) {
      toast.error("Both markStart and markEnd are required");
      return false;
    }
    console.log(markStart, markEnd);
    console.log(hoursIni, hoursFin);
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
          toast.success("The mark start hour is earlier than hoursIni");
          return true;
        } else {
          setInitialLate(true);
          setMarkInitial(markStart);
        }
      }
    } else if (markStart && markEnd) {
      const markEndHour = Number(markEnd.split(":")[0]);
      const markEndMinute = Number(markEnd.split(":")[1]);

      const hoursFinHour = Number(hoursFin.split(":")[0]);
      const hoursFinMinute = Number(hoursFin.split(":")[1]);

      if (
        markEndHour > hoursFinHour ||
        (markEndHour === hoursFinHour && markEndMinute >= hoursFinMinute)
      ) {
        toast.success("The mark end hour is greater than or equal to hoursFin");
        return true;
      } else {
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
    setIsLoading(true);
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

    await handleUpdateCycleHours(nameCycle).then(
      async (updatedBrandData: any) => {
        if (
          formattedDay &&
          updatedBrandData.cycle &&
          updatedBrandData.cycle[nameCycle]
        ) {
          const cycle = updatedBrandData.cycle[nameCycle];
          const existingHours = cycle.hours[currentDate];
          if (existingHours) {
            const markStart = existingHours.hIni;
            const markEnd = existingHours.hFin;
            if (checkMarkHours(markStart, markEnd)) {
              toast.success("The hours match. Performing update...");
            } else {
              toast.error("The mark hours do not match the defined hours.");
            }

            try {
              const response = await fetch(
                `/api/brands/${updatedBrandData.idEmployee}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedBrandData),
                }
              );
              if (response.ok) {
                const updatedBrands = await response.json();
                setBrandData((prevData) => ({
                  ...prevData,
                  ...updatedBrands,
                }));
                setFinish(true);
                setIsLoading(false);

                toast.success("Save successful");
              } else {
                toast.error("Save unsuccessful");
              }
            } catch (error) {
              toast.error("Error updating brands:");
            }
          }
        }
      }
    );
  };
  return (
    <div>
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
    </div>
  );
};
