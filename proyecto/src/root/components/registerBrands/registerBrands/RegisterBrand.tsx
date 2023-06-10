import {
  LaborRegistration,
  Cycle,
  HourRange,
  HoursEmployee,
} from "@/root/interface/brands";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [brandData, setBrandData] = useState<LaborRegistration>(data);

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
    const nameCycle = year.toString() + monthCycle.toString();

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

  const handleClear = async () => {
    dispatch(ResetEmployeeByUid());
    dispatch(ResetByVariable());
    setBrandData(data);
  };

  return (
    <>
      <h2 className="text-lg font-bold text-center text-darkBlue">
        Edit employee section
      </h2>
      <p className="text-center pb-4 font-semibold">
        This section is for editing schedules, please select the employee whose
        schedule you want to edit
      </p>
      <div className="flex flex-wrap justify-center items-start pb-10">
        <div className="w-full sm:w-1/3  justify-center  p-4 sm:p-12">
          <h1 className="text-center font-semibold">Filter employee</h1>
          <section className="flex w-full flex-row justify-end">
            <button onClick={handleClear} className="bg-darkBlue">
              {" "}
              <img src="/Images/eraser.png" alt="eraser" title="clean all" />
            </button>
          </section>

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
        </div>

        <div className="w-full sm:w-2/3 flex mt-5 flex-col">
          <div className="bg-white sm:p-8 shadow-md w-full">
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
              className="md:flex-col lg:flex-row sm:flex-col  pb-2 justify-center"
            >
              <div className="-mx-3 flex flex-wrap"></div>
              <div className="flex flex-col justify-center">
                <label htmlFor="day" className="font-semibold text-center">
                  Day
                </label>
                <select
                  name="day"
                  id="day"
                  value={newDate}
                  onChange={handleDayChange}
                  className="w-full rounded-md bg-lithBlue bg-opacity-50 py-3 px-6 text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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

              <div className="flex flex-wrap">
                <RegisterClock
                  label={"Star time"}
                  type={"hIni"}
                  name={"hIni"}
                  value={newHIni}
                  id={"hIni"}
                  onChange={(e) => setNewHIni(e.target.value)}
                />
                <RegisterClock
                  label={"End time"}
                  type={"hFin"}
                  name={"hFin"}
                  value={newHFin}
                  id={"hFin"}
                  onChange={(e) => setNewHFin(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <button className="md:w-1/4 sm:w-full bg-darkBlue hover:bg-green text-white font-bold ">
                  Add schedules
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="md:w-1/4 flex justify-center sm:w-full bg-darkBlue hover:bg-green text-white font-bold "
                  title="Save all"
                >
                  {" "}
                  <img src="/Images/save.png" alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
