import { Employee } from "@/root/interface/departments";
import { Attendance, UserData } from "@/root/interface/employee";
import React, { useState, useEffect, use } from "react";
import FormJustify from "./formJustify/FormJustify";
import { toast } from "react-hot-toast";
import { EmployeesType } from "@/root/types/Employee.type";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import { useDispatch } from "react-redux";
import { StartUpDateEmployee } from "@/root/redux";

interface assistance {
  hIni: string;
  hFin: string;
  date: string;
  uuid: string;
  style?: React.CSSProperties;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JustificationEmployee({
  hIni,
  hFin,
  uuid,
  setFinish,
  ...props
}: assistance) {
  const dispatch = useDispatch()
  const [data, setData] = useState<UserData[]>([]);
  const [justify, setJustify] = useState("");
  const [isAttendanceUpdated, setAttendanceUpdated] = useState(false);
  const [userData, setUserData] = useState<EmployeesType>(initialDataEmployee);

  useEffect(() => {
    if (uuid) {
      handleEmployee(uuid);
    }
  }, [uuid]);

  useEffect(() => {
    if (isAttendanceUpdated) {
      handleUpdate();
      setAttendanceUpdated(false);
    }
  }, [isAttendanceUpdated, userData]);

  const handleSubmitAttendanceAndUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!props.date || !justify) {
      toast.error("Please enter values for all fields");
      return;
    }

    const attendanceDate = props.date;
    if (hIni && justify) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        attendance: {
          ...prevUserData.attendance,
          [attendanceDate]: {
            ...(prevUserData.attendance?.[attendanceDate] || {}),
            startTime: hIni,
            justificationIni: justify,
            endTime: "",
            justificationFin: "",
            state: "waiting",
          },
        },
      }));
      setAttendanceUpdated(true);
    }

    if (hFin && justify) {
      setUserData((prevUserData) => {
        const { attendance } = prevUserData;
        const attendanceDateData = attendance?.[attendanceDate] || {};

        return {
          ...prevUserData,
          attendance: {
            ...attendance,
            [attendanceDate]: {
              ...attendanceDateData,
              endTime: hFin,
              justificationFin: justify,
              startTime: attendanceDateData.startTime || "",
              justificationIni: attendanceDateData.justificationIni || "",
              state: "waiting",
            },
          },
        };
      });
      setAttendanceUpdated(true);
    }

    const justifyRef = justify;
    await new Promise((resolve) => setTimeout(resolve, 0));
    setJustify(justifyRef);
  };

  const handleUpdate = async () => {
/*     try {
      const response = await fetch(`/api/employees/${userData.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setData(updatedUser);
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      toast.error("Error updating user:");
    } */
    dispatch(StartUpDateEmployee(userData.uid, userData))
    setJustify("");
    setFinish(false);
  };

  const handleEmployee = async (id: string) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setUserData(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      toast.error("Error getting user data");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className={`flex flex-col ${props.style}`}>
        <FormJustify
          handleSubmitAttendance={handleSubmitAttendanceAndUpdate}
          justify={justify}
          setJustify={setJustify}
        />
      </div>
    </div>
  );
}
