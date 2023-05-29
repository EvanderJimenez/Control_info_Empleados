import { Brands, Cycle, Hours, HoursEmployee } from "@/root/interface/brands";
import React, { useState, useEffect } from "react";
import { SearchDepartment } from "../../creationDeparment/SearchDepartment";
import axios from "axios";
import FormEmployee from "../../registerBrands/formIdEmployee/FormEmployee";
import { RegisterCycle } from "../registerCycle/RegisterCycle";
import { RegisterClock } from "../registerClock/RegisterClock";
import TableSchedules from "../tableShedules/TableShedules";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetByVariable,
  ResetEmployeeByUid,
  selectGetBrandsByIdEmployee,
  selectGetEmployeeByUid,
  startCreateBrands,
  startGetBrandsByIdEmployee,
  startUpdateBrands,
} from "@/root/redux";
import SearchInput from "../../ui/searchInput/SearchInput";
import ListEmployee from "../../listEmployee/ListEmployee";
import ListScheduleEmployee from "./components/listSheduleEmployee/ListScheduleEmployee";

const data = {
  idEmployee: "",
  cycle: {},
  hoursEmployee: {},
};

export default function RegisterBrand() {
  const brandsIdEmployee = useSelector(selectGetBrandsByIdEmployee);
  const employeeUid = useSelector(selectGetEmployeeByUid);
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState("");
  const [newCycle, setNewCycle] = useState<string>("");
  const [newDate, setNewDate] = useState("");
  const [newHIni, setNewHIni] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [updateDateTime, setUpdateDateTime] = useState(false);
  const [clear, setClear] = useState(false);
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
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
  const [brandData, setBrandData] = useState<Brands>(data);

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewDate(event.target.value);
  };

  useEffect(() => {
    const fetchCurrentDateTime = async () => {
      try {
        const response = await axios.get("http://worldtimeapi.org/api/ip");
        const { datetime } = response.data;
        const [date, time] = datetime.split("T");
        setCurrentDate(date);
      } catch (error) {
        toast.error("Error getting date and time:");
      }
    };

    fetchCurrentDateTime();
  }, [updateDateTime]);

  const handleSubmitCycle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdateDateTime(true);
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

    if (brandData.cycle && brandData.cycle[nameCycle]) {
      toast.error("Cycle already exists");
      return;
    }

    const newCycleObject: Cycle = {
      hours: {},
    };

    setBrandData((prevUserData) => ({
      ...prevUserData,
      cycle: {
        ...prevUserData.cycle,
        [nameCycle]: newCycleObject,
      },
    }));
  };
  const handleSubmitHours = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newDate) {
      toast.error("New date is empty");
      return;
    }

    if (brandData.hoursEmployee && brandData.hoursEmployee[newDate]) {
      toast.error("There is already a schedule for this date");
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

  useEffect(() => {
    if (employeeUid) {
      dispatch(startGetBrandsByIdEmployee(employeeUid.uid));
    }
  }, [dispatch, clear]);

  useEffect(() => {
    if (brandsIdEmployee) {
      setBrandData(brandsIdEmployee);
    }
  }, [dispatch, brandsIdEmployee]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (brandData.idEmployee && employeeUid) {
      dispatch(startUpdateBrands(brandData.idEmployee, brandData));
      setBrandData(data);
      dispatch(ResetEmployeeByUid());
      dispatch(ResetByVariable());
    } else if (employeeUid?.uid) {
      const updatedBrandData = { ...brandData };
      updatedBrandData.idEmployee = employeeUid.uid;

      dispatch(startCreateBrands(updatedBrandData));
      setBrandData(data);
      dispatch(ResetEmployeeByUid());
      dispatch(ResetByVariable());
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-start pt-10">
      <div className="flex items-center justify-center p-4 sm:p-12">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="font-semibold text-center">Filters</h2>
          <SearchInput
            labelInputSeekerOne="text"
            valueEnd={cedula}
            placeholderSeekerOne="Cedula"
            typeList="cedula"
            id="cedula"
          />
          <SearchInput
            labelInputSeekerOne="text"
            valueEnd={name}
            placeholderSeekerOne="Name"
            typeList="name"
            id="name"
          />
          <SearchInput
            labelInputSeekerOne="text"
            valueEnd={jobPosition}
            placeholderSeekerOne="Job Position"
            typeList="jobPosition"
            id="jobPosition"
          />
          <ListScheduleEmployee
            dispatch={dispatch}
            clear={clear}
            setClear={setClear}
          />
          <RegisterCycle
            brandData={brandData}
            label="Cycle to belongs"
            onChange={(e) => setNewCycle(e.target.value)}
            value={newCycle}
            handleSubmitCycle={handleSubmitCycle}
          />
          <form
            action="https://formbold.com/s/FORM_ID"
            onSubmit={handleSubmitHours}
            className="space-y-5"
          >
            <div className="-mx-3 flex flex-wrap"></div>
            <div className="mb-5">
              <label
                htmlFor="day"
                className="mb-3 block text-base font-medium text-gray-700"
              >
                Day
              </label>
              <select
                name="day"
                id="day"
                value={newDate}
                onChange={handleDayChange}
                className="w-full rounded-md border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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

            <div className="-mx-3 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
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
              <button className="w-full bg-black hover:bg-green text-white font-bold py-3 px-4 rounded">
                Add Schedules
              </button>
            </div>
          </form>
          <TableSchedules
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

          <form onSubmit={handleUpdate} className="pt-10">
            <button
              type="submit"
              className="w-full bg-black hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
