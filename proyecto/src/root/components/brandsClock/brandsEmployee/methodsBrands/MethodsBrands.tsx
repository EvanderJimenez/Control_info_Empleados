import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO, getDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { selectGetBrandsByIdEmployee, selectLogin, startGetBrandsByIdEmployee } from "@/root/redux";
import { LaborRegistration } from "@/root/interface/brands";
import { BrandsEmployee } from "../BrandsEmployee";

export default function MethodsBrands() {


  const dispatch = useDispatch()
  const brandsGetByIdEmployee = useSelector(selectGetBrandsByIdEmployee)

  const [formattedDay, setFormattedDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [updateDateTime, setUpdateDateTime] = useState(false);
  const [hoursIni, setHoursIni] = useState("");
  const [hoursFin, setHoursFin] = useState("");
  const employeeLogin = useSelector(selectLogin);
  let localHoursIni: string = "";
  let localHoursFin: string = "";

  const [brandData, setBrandData] = useState<LaborRegistration>({
    idEmployee: "",
    cycle: {},
    hoursEmployee: {},
  });

  useEffect(() => {
    const fetchDataAndDateOfWeekday = async () => {
      const response = await axios.get("http://worldtimeapi.org/api/ip");
      const { datetime } = response.data;
      const [date, time] = datetime.split("T");
      setCurrentDate(date);
      setCurrentTime(time.slice(0, 8));

      const parsedDate = parseISO(date);
      const formattedDay = format(parsedDate, "EEEE");

      setFormattedDay(formattedDay);
    };

    fetchDataAndDateOfWeekday();
  }, [updateDateTime]);

  useEffect(() => {
    if (employeeLogin?.uid) {
      handleGetBrands(employeeLogin?.uid);
    }
  }, [employeeLogin?.uid]);

  const handleGetBrands = async (id: string) => {

   await  dispatch(startGetBrandsByIdEmployee(id))


  };

  useEffect(() => {
  
    if(brandsGetByIdEmployee){
      setBrandData(brandsGetByIdEmployee);
    }

  }, [brandsGetByIdEmployee])

  return (
    <div>
      <BrandsEmployee
        brandData={brandData}
        currentDate={currentDate}
        formattedDay={formattedDay}
        localHoursIni={localHoursIni}
        localHoursFin={localHoursFin}
        setBrandData={setBrandData}
        currentTime={currentTime}
        setHoursFin={setHoursFin}
        setHoursIni={setHoursIni}
        setUpdateDateTime={setUpdateDateTime}
      />
    </div>
  );
}
