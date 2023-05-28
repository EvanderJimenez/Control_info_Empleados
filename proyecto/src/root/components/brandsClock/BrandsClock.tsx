import React, { useEffect, useState } from "react";
import Clock from "./brandsEmployee/clock/Clock";
import { SearchDepartment } from "../creationDeparment/SearchDepartment";
import { Brands } from "@/root/interface/brands";
interface methodsBrands {
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}
function BrandsClock({ handleUpdate, ...props }: methodsBrands) {
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
      <Clock time={time} handleUpdate={handleUpdate} />
    </div>
  );
}

export default BrandsClock;
