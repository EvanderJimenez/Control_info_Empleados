import { UserData } from "@/root/interface/employee";
import React, { useState } from "react";
import AdminEdit from "../AdminEdit";

interface RegisterProps {
  user?: UserData;
}

const MethodsEmployee = (props: RegisterProps) => {
  const [data, setData] = useState<UserData[]>([]);
  const [upDate, setUpDate] = useState<boolean | null>();
  const [userData, setUserData] = useState<UserData>(() => {
    if (props.user) {
      setUpDate(true);
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
        setData((prevData) => {
          const newData = [...prevData];
          const userIndex = newData.findIndex(
            (user) => user.uid === updatedUser.uid
          );
          if (userIndex >= 0) {
            newData[userIndex] = updatedUser;
          }
          return newData;
        });
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleGetUser = async (id: string) => {
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
    <div>
      <AdminEdit
        usersData={userData}
        handleInputChange={handleInputChange}
        handleGetUsers={handleGetUser}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default MethodsEmployee;
