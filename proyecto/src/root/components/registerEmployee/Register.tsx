import React, { useState } from "react";
import { UserData } from "../../interface/employee/";
import PrincipalData from "./components/principalData/PrincipalData";

interface RegisterProps {
  user?: UserData;
  onCancel: () => void;
}

function Register(props: RegisterProps) {
  const [data, setData] = useState<UserData[]>([]);

  const [upDate, setUpDate] = useState<boolean | null>();

  const [userData, setUserData] = useState<UserData>(() => {
    if (props.user) {
      setUpDate(true);
      console.log(props.user);
      return props.user;
    } else {
      return {
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
        idDepartment: 0,
        password: "",
        email: "",
        boss: "",
        schedule: [],
        option: "register",
      };
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Data: " + JSON.stringify(userData));

    fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((newUser) => setData([...data, newUser]))
      .catch((error) => console.error("Error al crear nuevo usuario:", error));

    setUserData({
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
      idDepartment: 0,
      password: "",
      email: "",
      boss: "",
      schedule: [],
      option: "register",
    });
  };

  const handleScheduleChange = (newSchedule: any) => {
    console.log(userData);
    setUserData((prevUserData) => ({ ...prevUserData, schedule: newSchedule }));
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <PrincipalData userData={userData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleScheduleChange={handleScheduleChange} />
    </div>
  );
}

export default Register;
