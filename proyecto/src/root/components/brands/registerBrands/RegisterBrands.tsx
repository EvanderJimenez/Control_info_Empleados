import React, { useState, useEffect } from "react";
import { Brands, Hours, Cycle } from "@/root/interface/brands";
import axios from "axios";
function RegisterBrands() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [newCycle, setNewCycle] = useState<string>("");
  const [updateDateTime, setUpdateDateTime] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newHIni, setNewHIni] = useState("");
  const [newHFin, setNewHFin] = useState("");
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBrandData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = () => {
    setUpdateDateTime(true);
    setNewDate(currentDate);
    setNewHIni(currentTime);
    setNewHFin(currentTime);
  };

  const handleSubmitCycle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCycleObject: Cycle = {
      hours: {},
    };

    setBrandData((prevUserData) => ({
      ...prevUserData,
      cycle: {
        ...prevUserData.cycle,
        [newCycle]: newCycleObject,
      },
    }));
  };
  const handleSubmitHours = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newHIni || !newDate || !newCycle) {
      console.error("Please enter values for all fields");
      return;
    }

    const newHoursObject: Hours = {
      hIni: newHIni,
      hFin: "",
    };

    const selectedCycle = brandData.cycle[newCycle];

    if (selectedCycle) {
      const { hours, ...restCycle } = selectedCycle;

      const updatedCycle = {
        ...restCycle,
        [newDate]: newHoursObject,
      };

      newFunction(updatedCycle);

      setNewHIni("");
      setNewHFin("");
    } else {
      console.error("The selected cycle does not exist");
    }

    function newFunction(updatedCycle: {}) {
      setBrandData((prevData) => ({
        ...prevData,
        cycle: {
          ...prevData.cycle,
          [newCycle]: updatedCycle,
        },
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!brandData.idEmployee) {
      console.error("Please enter values for all fields");
      return;
    }

    fetch("/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandData),
    })
      .then((res) => res.json())
      .then((newDate) => {
        setBrandData({
          idEmployee: "",
          cycle: {},
          hoursEmployee: {},
        });
      })
      .catch((error) => console.error("Error creating new hours:", error));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitHours} className="space-y-4">
          <p>Fecha actual: {currentDate}</p>
          <p>Hora actual: {currentTime}</p>
          <button
            type="submit"
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Guardar Horas
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterBrands;
