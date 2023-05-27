import { Employee } from "@/root/interface/departments";
import { Attendance, UserData } from "@/root/interface/employee";
import React, { useState, useEffect } from "react";
import { SearchDepartment } from "../adminDepartment/SearchDepartment";
interface asistence {
  hIni: string;
  hFin: string;
  date: string;
  uuid: string;
}
export default function JustificationEmployee({
  hIni,
  hFin,
  uuid,
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
    brands: [],
    option: "register",
    attendance: {},
  });
  useEffect(() => {
    if (uuid) {
      handleEmployee(uuid);
    }
  }, [uuid]);

  const handleClick = () => {
    console.log(userData);
  };
  const handleSubmitAttendance = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!props.date || !justify) {
      console.error("Please enter values for all fields");
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
            ...prevUserData.attendance[attendanceDate],
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
      setUserData((prevUserData) => ({
        ...prevUserData,
        attendance: {
          ...prevUserData.attendance,
          [attendanceDate]: {
            ...prevUserData.attendance[attendanceDate],
            endTime: hFin,
            justificationFin: justify,
            startTime: "",
            justificationIni: "",
            state: "waiting",
          },
        },
      }));
    }
    setJustify("");
  };
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/employees/${userData.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setData(updatedUser);
        console.log(updatedUser);
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
        console.log(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting user data", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-wrap">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  py-2 px-2  pd-10 ">
          ATTENDANCE
        </h2>
        <form
          className="w-full max-w-lg px-10"
          onSubmit={handleSubmitAttendance}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="message"
              >
                Justification
              </label>
              <textarea
                className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="message"
                value={justify}
                onChange={(event) => setJustify(event.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="md:flex md:items-center justify-between">
            <div className="md:w-1/3">
              <button
                className="shadow bg-blue hover:bg-teal focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Completed
              </button>
            </div>
          </div>
        </form>
        <form className="w-full max-w-lg px-10" onSubmit={handleUpdate}>
          <div className="md:flex md:items-center justify-between">
            <div className="md:w-1/3">
              <button
                type="submit"
                className="shadow bg-blue hover:bg-teal focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
