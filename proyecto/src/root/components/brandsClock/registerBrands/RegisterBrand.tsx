import { Brands, Cycle, Hours, HoursEmployee } from "@/root/interface/brands";
import React, { useState } from "react";
import { RegisterClock } from "../registerClock/RegisterClock";
import { RegisterCycle } from "../registerCycle/RegisterCycle";
import TableShedules from "../tableShedules/TableShedules";
import { SearchDepartment } from "../../adminDepartment/SearchDepartment";

export default function RegisterBrand() {
  const [newCycle, setNewCycle] = useState<string>("");
  const [newDate, setNewDate] = useState("");
  const [newHIni, setNewHIni] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleEditClick = (index: number) => {
    const schedule = Object.values(brandData.hoursEmployee)[index];

    if (schedule) {
      setEditingIndex(index);
      setIsEditing(true);
      setNewHIni(schedule.hIni);
      setNewHFin(schedule.hFin);
    }
  };

  const [newHFin, setNewHFin] = useState("");
  const [brandData, setBrandData] = useState<Brands>({
    idEmployee: "",
    cycle: {},
    hoursEmployee: {},
  });

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewDate(event.target.value);
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
    if (!newDate) {
      console.error("New date is empty");
      return;
    }
    const newHoursEmployee: HoursEmployee = {
      hIni: newHIni,
      hFin: newHFin,
    };

    setBrandData((prevUserData) => ({
      ...prevUserData,
      hoursEmployee: {
        ...prevUserData.hoursEmployee,
        [newDate]: newHoursEmployee,
      },
    }));

    setNewHIni("");
    setNewHFin("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBrandData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(brandData);
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
      .then((newData) => {
        setBrandData({
          idEmployee: "",
          cycle: {},
          hoursEmployee: {},
        });
      })
      .catch((error) => console.error("Error creating new brand:", error));
  };

  const handleDeleteSchedule = (date: string) => {
    if (brandData.hoursEmployee[date]) {
      const updatedHoursEmployee = { ...brandData.hoursEmployee };
      delete updatedHoursEmployee[date];
      setBrandData((prevUserData) => ({
        ...prevUserData,
        hoursEmployee: updatedHoursEmployee,
      }));
    }
  };
  const handleSaveClick = (index: number) => {
    const updatedHoursEmployee = { ...brandData.hoursEmployee };
    const date = Object.keys(updatedHoursEmployee)[index];
    updatedHoursEmployee[date] = {
      hIni: newHIni,
      hFin: newHFin,
    };

    setBrandData((prevUserData) => ({
      ...prevUserData,
      hoursEmployee: updatedHoursEmployee,
    }));

    setIsEditing(false);
    setEditingIndex(-1);
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
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting brands data", error);
    }
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

      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <RegisterCycle
            label="Cycle to belongs"
            onChange={(e) => setNewCycle(e.target.value)}
            value={newCycle}
            handleSubmitCycle={handleSubmitCycle}
          />
          <form
            action="https://formbold.com/s/FORM_ID"
            onSubmit={handleSubmitHours}
          >
            <div className="-mx-3 flex flex-wrap"></div>
            <div className="mb-5">
              <label
                htmlFor="day"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Day
              </label>
              <select
                name="day"
                id="day"
                value={newDate}
                onChange={handleDayChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <RegisterClock
                label={"Hora Inicio"}
                type={"hIni"}
                name={"hIni"}
                value={newHIni}
                id={"hIni"}
                onChange={(e) => setNewHIni(e.target.value)}
              />
              <RegisterClock
                label={"Hora Fin"}
                type={"hFin"}
                name={"hFin"}
                value={newHFin}
                id={"hFin"}
                onChange={(e) => setNewHFin(e.target.value)}
              />
            </div>

            <div>
              <button className="hover:shadow-form rounded-md bg-[#036302] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Add Schedules
              </button>
            </div>
          </form>
          <TableShedules
            brandData={brandData}
            setNewHIni={setNewHIni}
            setNewHFin={setNewHFin}
            newHIni={newHIni}
            newHFin={newHFin}
            isEditing={isEditing}
            editingIndex={editingIndex}
            handleSaveClick={handleSaveClick}
            handleEditClick={handleEditClick}
            handleDeleteSchedule={handleDeleteSchedule}
          />
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1"
          >
            <div className="mb-5">
              <label
                htmlFor="lName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Id Employee
              </label>
              <input
                type="text"
                name="idEmployee"
                value={brandData.idEmployee}
                onChange={handleInputChange}
                placeholder="ID Employee"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              save
            </button>
          </form>
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 pt-10"
          >
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
