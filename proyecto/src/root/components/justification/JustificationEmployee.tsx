import { Employee } from "@/root/interface/departments";
import { Attendance, UserData } from "@/root/interface/employee";
import React, { useState, useEffect } from "react";
import FormJustify from "./formJustify/FormJustify";
import { toast } from "react-hot-toast";
interface asistence {
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
}: asistence) {
  const [dateA, setDataA] = useState("");
  const [data, setData] = useState<UserData[]>([]);
  const [justify, setJustify] = useState("");
  const [userData, setUserData] = useState<UserData>({
    uid: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    cedula: 0,
    phoneNumber: 0,
    photo: "",
    jobPosition: "",
    salary: 0,
    enabled: true,
    idDepartment: "",
    password: "",
    email: "",
    boss: "",
    schedule: [],
    option: "register",
    attendance: {},
  });
  useEffect(() => {
    if (uuid) {
      handleEmployee(uuid);
    }
  }, [uuid]);

  const handleSubmitAttendanceAndUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!props.date || !justify) {
      toast.error("Please enter values for all fields");
      return;
    }
    const newAttendanceObject: Attendance = {
      startTime: hIni,
      endTime: hFin,
      justificationIni: justify,
      justificationFin: justify,
      state: "waiting",
    };

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
    }

    const justifyRef = justify;

    await new Promise((resolve) => setTimeout(resolve, 0));

    await handleUpdate(event);
    setJustify(justifyRef);
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
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
    }
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
