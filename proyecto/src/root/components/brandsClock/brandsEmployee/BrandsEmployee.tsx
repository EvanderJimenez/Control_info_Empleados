import React, { useEffect, useState } from "react";
import { format, parseISO, getDay } from "date-fns";
import { LaborRegistration } from "@/root/interface/brands";
import JustificationEmployee from "../../justification/JustificationEmployee";
import { toast } from "react-hot-toast";
import { BrandsClock } from "../BrandsClock";
import { LoadIndicator } from "../loadIndicator/LoadIndicator";
import { setLoading } from "@/root/redux/reducers/loading-reducer/LoadingReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectUpdateBrands, startUpdateBrands } from "@/root/redux";

interface methods {
  brandData: LaborRegistration;
  currentDate: string;
  currentTime: string;
  formattedDay: string;
  localHoursIni: string;
  localHoursFin: string;
  setBrandData: React.Dispatch<React.SetStateAction<LaborRegistration>>;
  setHoursFin: React.Dispatch<React.SetStateAction<string>>;
  setHoursIni: React.Dispatch<React.SetStateAction<string>>;
  setUpdateDateTime: React.Dispatch<React.SetStateAction<boolean>>;
}

let value: string;

export const BrandsEmployee = ({
  brandData,
  currentDate,
  formattedDay,
  localHoursFin,
  localHoursIni,
  setBrandData,
  currentTime,
  setHoursFin,
  setHoursIni,
  setUpdateDateTime,
  ...props
}: methods) => {
  const dispatch = useDispatch();
  const brandsUpdate = useSelector(selectUpdateBrands);
  const [initialLate, setInitialLate] = useState(false);
  const [finalDelay, setFinalDelay] = useState(false);
  const [markInitial, setMarkInitial] = useState("");
  const [markFinal, setMarkFinal] = useState("");
  const [finish, setFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (brandData?.idEmployee) handleUpdate();
  }, [brandData?.idEmployee]);
  useEffect(() => {
    if (load) {
      window.location.reload();
    }
  }, [load]);
  const handleUpdate = async () => {


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

    await handleUpdateCycleHours(nameCycle).then(
      async (updatedBrandData: any) => {
        if (
          formattedDay &&
          updatedBrandData.cycle &&
          updatedBrandData.cycle[nameCycle]
        ) {
          const cycle = updatedBrandData.cycle[nameCycle];
          const existingHours = cycle.hours[currentDate];
          if (existingHours) {
            const markStart = existingHours.hIni;
            const markEnd = existingHours.hFin;
            if (checkMarkHours(markStart, markEnd)) {
              toast.success("The hours match. Performing update...");
              value = "true";
            } else {
              toast.error("The mark hours do not match the defined hours.");
            }

            await dispatch(
              startUpdateBrands(updatedBrandData.id, updatedBrandData)
            );
          }
        }
      }
    );
  };

  useEffect(() => {
    if (brandsUpdate) {
      setBrandData((prevData) => ({
        ...prevData,
        ...brandsUpdate,
      }));




      if (value === "true") {
        setLoad(true);
      }
    }
  }, [brandsUpdate]);

  const handleUpdateCycleHours = async (cycleName: string) => {
    setIsLoading(true);
    setUpdateDateTime(true);
    const weekday = formattedDay;
    const hoursEmployee = brandData.hoursEmployee;

    if (hoursEmployee.hasOwnProperty(weekday)) {
      const { hIni, hFin } = hoursEmployee[weekday];
      setHoursFin(hFin);
      setHoursIni(hIni);
      localHoursIni = hIni;
      localHoursFin = hFin;
    } else {
      toast.error(`No information found for the day: ${weekday}`);
      return;
    }

    if (!brandData?.cycle?.[cycleName]) {
      return;
    }

    const cycle = brandData.cycle[cycleName];
    const existingHours = cycle.hours[currentDate];
    const updatedHours = existingHours
      ? { ...existingHours, hFin: currentTime }
      : { hIni: currentTime, hFin: "" };

    const updatedCycle = {
      ...cycle,
      hours: {
        ...cycle.hours,
        [currentDate]: updatedHours,
      },
    };

    return new Promise((resolve, reject) => {
      setBrandData((prevData) => {
        const updatedBrandData = {
          ...prevData,
          cycle: {
            ...prevData.cycle,
            [cycleName]: updatedCycle,
          },
        };
        resolve(updatedBrandData);
        return updatedBrandData;
      });
    });
  };
  const checkMarkHours = (markStart: string, markEnd: string): boolean => {
    let hoursIni = localHoursIni;
    let hoursFin = localHoursFin;
    if (!markStart && !markEnd) {
      toast.error("Both markStart and markEnd are required");
      return false;
    }
    if (!markEnd) {
      if (markStart) {
        const markStartHour = Number(markStart.split(":")[0]);
        const markStartMinute = Number(markStart.split(":")[1]);

        const hoursIniHour = Number(hoursIni.split(":")[0]);
        const hoursIniMinute = Number(hoursIni.split(":")[1]);

        if (
          markStartHour < hoursIniHour ||
          (markStartHour === hoursIniHour && markStartMinute < hoursIniMinute)
        ) {
          toast.success("The mark start hour is earlier than hoursIni");
          return true;
        } else {
          setLoad(false);
          setFinish(true);
          setInitialLate(true);
          setMarkInitial(markStart);
        }
      }
    } else if (markStart && markEnd) {
      const markEndHour = Number(markEnd.split(":")[0]);
      const markEndMinute = Number(markEnd.split(":")[1]);

      const hoursFinHour = Number(hoursFin.split(":")[0]);
      const hoursFinMinute = Number(hoursFin.split(":")[1]);

      if (
        markEndHour > hoursFinHour ||
        (markEndHour === hoursFinHour && markEndMinute >= hoursFinMinute)
      ) {
        toast.success("The mark end hour is greater than or equal to hoursFin");
        return true;
      } else {
        setLoad(false);
        setFinish(true);
        setFinalDelay(true);
        setMarkFinal(markEnd);
      }
    }

    return false;
  };

  return (
    <div>
      <div>
        {load ? (
          <LoadIndicator />
        ) : (
          <div>
            {initialLate === true && finish === true ? (
              <JustificationEmployee
                hIni={markInitial}
                hFin={""}
                date={currentDate}
                uuid={brandData.idEmployee}
                style={{ position: "absolute", top: 0, left: 0 }}
                setFinish={setFinish}
                setLoad={setLoad}
              />
            ) : null}
            {finalDelay === true && finish === true ? (
              <JustificationEmployee
                hIni={""}
                hFin={markFinal}
                date={currentDate}
                uuid={brandData.idEmployee}
                style={{ position: "absolute", top: 0, left: 0 }}
                setFinish={setFinish}
                setLoad={setLoad}
              />
            ) : null}
            {finish === false ? (
              <BrandsClock handleUpdate={handleUpdate} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
