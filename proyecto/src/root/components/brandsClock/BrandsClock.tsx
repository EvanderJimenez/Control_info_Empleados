import React, { useEffect, useState } from "react";
import Clock from "./brandsEmployee/clock/Clock";
import { SearchDepartment } from "../adminDepartment/SearchDepartment";
import { Brands } from "@/root/interface/brands";
interface methodsBrands {
  currentDate: string;
  currentTime: string;
  hoursIni: string;
  formattedDay: string;
  hoursFin: string;
  updateDateTime: boolean;
  brandData: Brands;
  handleClick1: () => void;
  handleGetBrands: (id: string) => void;
  getDateOfWeekday: (newDate: string) => string;
  handleUpdateCycleHours: (cycleName: string) => void;
  checkMarkHours: (markStart: string, markEnd: string) => boolean;
  setBrandData: React.Dispatch<React.SetStateAction<Brands>>;
}
function BrandsClock({
  currentDate,
  currentTime,
  hoursIni,
  formattedDay,
  hoursFin,
  updateDateTime,
  brandData,
  handleClick1,
  handleGetBrands,
  getDateOfWeekday,
  handleUpdateCycleHours,
  checkMarkHours,
  setBrandData,
  ...props
}: methodsBrands) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      const currentTime =
        formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

      setTime(currentTime);
    };

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdateCycleHours("Ciclo 1");
    console.log(hoursFin, hoursIni);
    if (formattedDay && brandData.cycle && brandData.cycle["Ciclo 1"]) {
      const cycle = brandData.cycle["Ciclo 1"];
      const existingHours = cycle.hours[currentDate];

      if (existingHours) {
        const markStart = existingHours.hIni;
        const markEnd = existingHours.hFin;

        if (checkMarkHours(markStart, markEnd)) {
          console.log("The hours match. Performing update...");
        } else {
          console.log("The mark hours do not match the defined hours.");
        }

        fetch(`/api/brands/${brandData.idEmployee}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(brandData),
        })
          .then((res) => res.json())
          .then((updatedBrands) => {
            setBrandData((prevData) => ({
              ...prevData,
              ...updatedBrands,
            }));
          })
          .catch((error) => console.error("Error updating brands:", error));
      }
    }
  };
  return (
    <div>
      <SearchDepartment handleGet={handleGetBrands} />
      <button onClick={handleClick1} className="bg-red">
        Click me
      </button>
      <Clock time={time} handleUpdate={handleUpdate} />
    </div>
  );
}

export default BrandsClock;
