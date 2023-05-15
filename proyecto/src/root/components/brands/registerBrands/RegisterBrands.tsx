import React, { useState, useEffect } from "react";
import { Brands, Cycle, Hours } from "@/root/interface/brands";
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
      hFin: newHFin,
    };

    const selectedCycle = brandData.cycle[newCycle];

    if (selectedCycle) {
      const { hours, ...restCycle } = selectedCycle;

      const updatedCycle = {
        ...restCycle,
        [newDate]: newHoursObject,
      };

      setBrandData((prevData) => ({
        ...prevData,
        cycle: {
          ...prevData.cycle,
          [newCycle]: updatedCycle,
        },
      }));

      setNewHIni("");
      setNewHFin("");
    } else {
      console.error("The selected cycle does not exist");
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
        });
      })
      .catch((error) => console.error("Error creating new hours:", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmitCycle}>
        <button type="submit">Agregar Ciclo</button>
      </form>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
        <input type="text" name="newCycle" value={newCycle} onChange={(event) => setNewCycle(event.target.value)} placeholder="New Cycle" className="border rounded-md px-3 py-2" />
        <input type="text" name="idEmployee" value={brandData.idEmployee} onChange={handleInputChange} placeholder="ID Employee" className="border rounded-md px-3 py-2" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          save
        </button>
        <p>Fecha actual: {currentDate}</p>
        <p>Hora actual: {currentTime}</p>
      </form>
      <button onClick={handleClick}>Clickme</button>
      <div>
        {Object.entries(brandData.cycle).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <span className="mr-2 font-bold">Name:</span>
            <span>{key}</span>
            <span className="ml-4 mr-2 font-bold">Information Personal:</span>
            <button onClick={() => setNewCycle(key)} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Select
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmitCycle} className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="newCycle" className="mr-2 font-bold">
            Employees Name:
          </label>
          <input type="text" name="newCycle" value={newCycle} onChange={(e) => setNewCycle(e.target.value)} placeholder="Employee's name" className="border rounded-md px-3 py-2" />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          jajajaj
        </button>
      </form>
      <div>
        <form onSubmit={handleSubmitHours} className="space-y-4">
          <p>Fecha actual: {currentDate}</p>
          <p>Hora actual: {currentTime}</p>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            Guardar Horas
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterBrands;
