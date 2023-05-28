import React, { useEffect, useState } from "react";
import Clock from "./brandsEmployee/clock/Clock";
import { SearchDepartment } from "../creationDeparment/SearchDepartment";
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
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
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
  setFinish,
  handleUpdate,
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
