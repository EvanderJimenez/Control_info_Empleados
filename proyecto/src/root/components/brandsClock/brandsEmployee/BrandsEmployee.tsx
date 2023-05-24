import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchDepartment } from "../../adminDepartment/SearchDepartment";
import { format, parseISO, getDay } from "date-fns";
import { Brands } from "@/root/interface/brands";

export const BrandsEmployee = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [updateDateTime, setUpdateDateTime] = useState(false);
  const [brandData, setBrandData] = useState<Brands>({
    idEmployee: "",
    cycle: {},
    hoursEmployee: {},
  });
  const [editedDate, setEditedDate] = useState("");
  const [editedHIni, setEditedHIni] = useState("");
  const [editedHFin, setEditedHFin] = useState("");

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
    const cycle = brandData.cycle;

    if (cycle) {
      const cicloDeseado = cycle["Ciclo 1"];
      const hours = cicloDeseado?.hours[currentDate];

      if (hours) {
        const { hIni, hFin } = hours;
        console.log(hIni, hFin);
      }
    }
  };

  const handleGetBrands = async (idEmployee: string) => {
    try {
      const response = await fetch(`/api/brands/${idEmployee}`, {
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
    const formattedDay = format(date, "EEEE");
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

      setEditedDate("");
      setEditedHIni("");
      setEditedHFin("");
    }
    console.log(brandData);
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(brandData.idEmployee);
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
  };
  return (
    <div>
      <SearchDepartment handleGet={handleGetBrands} />

      <input
        type="text"
        value={editedDate}
        onChange={(e) => setEditedDate(e.target.value)}
        placeholder="Edited Date"
      />

      <input
        type="text"
        value={editedHIni}
        onChange={(e) => setEditedHIni(e.target.value)}
        placeholder="Edited Start Hour"
      />

      <input
        type="text"
        value={editedHFin}
        onChange={(e) => setEditedHFin(e.target.value)}
        placeholder="Edited Finish Hour"
      />

      <button onClick={() => handleUpdateCycleHours("Ciclo 1")}>
        Edit Marks
      </button>

      <button onClick={handleClick1}>ClickMe</button>
      <form action="" onSubmit={handleUpdate}>
        <button
          type="submit"
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          save
        </button>
      </form>
    </div>
  );
};
