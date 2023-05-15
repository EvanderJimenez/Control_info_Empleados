
import React, { useState } from "react";
import { UserData } from "../../interface/employee/";
import PrincipalData from "./components/principalData/PrincipalData";
import UpdateData from "./components/updateData/UpdateData";
import Schedule from "./components/schedule/Schedule";
import Brands from "./components/brands/Brands";
import ImageEmployee from "./components/imageEmployee/ImageEmployee";

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
        idDepartment: "",
        password: "",
        email: "",
        boss: "",
        schedule: [],
        brands: [], 
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
      idDepartment: "",
      password: "",
      email: "",
      boss: "",
      schedule: [],
      brands: [],
      option: "register",
    });
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Nuevo usuario:", userData);

    fetch(`/api/employees/${userData.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setData((prevData) => {
          const newData = [...prevData];
          const userIndex = newData.findIndex((user) => user.cedula === updatedUser.uid);
          if (userIndex >= 0) {
            newData[userIndex] = updatedUser;
          }
          return newData;
        });
        props.onCancel();
      })
      .catch((error) => console.error("Error al actualizar usuario:", error));
  };

  const handleScheduleChange = (newSchedule: any) => {
    console.log(userData);
    setUserData((prevUserData) => ({ ...prevUserData, schedule: newSchedule }));
  };

  const handleBrandChange = (newBrand: any) => {
    console.log(userData)
    setUserData((prevUserData) => ({ ...prevUserData, brands: newBrand }));
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {upDate ? (
        <UpdateData userData={userData} handleInputChange={handleInputChange} handleSubmit={handleUpdate} handleScheduleChange={handleScheduleChange} />
      ) : (
        < PrincipalData userData={userData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleScheduleChange={handleScheduleChange} />
      )}

        <ImageEmployee userData={userData} handleSubmit={function (event: React.FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
      } }/>

        {/* <Brands handleBrandsChange ={handleBrandChange}/> */}

    </div>
  );
}

export default Register;