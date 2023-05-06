import React, { useState } from "react";
import RegisterDepartment from "./RegisterDepartment";

interface UserData {
  name: string;
  size: number;
  location: string;
  area: string;
  leader: string;
  skills: string;
  mainDepartment: boolean;
  subDepartment: string;
  nivel: string;
}

interface RegisterProps {
  user: UserData;
  onCancel: () => void;
}

function Register(props: RegisterProps) {
  const [data, setData] = useState<UserData[]>([]);

  const [actualizar, setActualizar] = useState<boolean>(!!props.user);
  const [userData, setUserData] = useState<UserData>(() => {
    if (props.user) {
      return props.user;
    } else {
      return {
        name: "",
        size: 0,
        location: "",
        area: "",
        leader: "",
        skills: "",
        mainDepartment: false,
        subDepartment: "",
        nivel: "",
      };
    }
  });

  const [isCheckedS, setIsCheckedS] = useState(false);

  const handleCheckboxChangeS = () => {
    setIsCheckedS(!isCheckedS);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const handleUpdate = () => {
      fetch(`/api/departments`, {
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
            const userIndex = newData.findIndex(
              (user) => user.name === updatedUser.name
            );
            if (userIndex >= 0) {
              newData[userIndex] = updatedUser;
            }
            return newData;
          });
          props.onCancel();
        })
        .catch((error) =>
          console.error("Error al actualizar departamento:", error)
        );
    };

    if (actualizar) {
      handleUpdate();
    } else {
      userData.mainDepartment = true;
      <RegisterDepartment />;
    }
  };
  return (
    <div>
      actualizar ? (
      <div>
        <form
          onSubmit={handleSubmit}
          className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Nombre del Departamento"
              className="border rounded-md px-3 py-2"
            />
            <input
              type="number"
              name="size"
              value={userData.size}
              onChange={handleInputChange}
              placeholder="Tamaño del Departamento"
              className="border rounded-md px-3 py-2"
            />
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleInputChange}
              placeholder="Ubicacion del Departamento"
              className="border rounded-md px-3 py-2"
            />
            <input
              type="text"
              name="area"
              value={userData.area}
              onChange={handleInputChange}
              placeholder="Area al que pertenece"
              className="border rounded-md px-3 py-2"
            />
            <input
              type="text"
              name="leader"
              value={userData.leader}
              onChange={handleInputChange}
              placeholder="Lider del departamento"
              className="border rounded-md px-3 py-2"
            />
            <input
              type="text"
              name="skills"
              value={userData.skills}
              onChange={handleInputChange}
              placeholder="Habilidades"
              className="border rounded-md px-3 py-2"
            />
            <label>
              <input
                type="checkbox"
                checked={isCheckedS}
                onChange={handleCheckboxChangeS}
              />
              Sub Departamento
            </label>
            {isCheckedS && (
              <input
                type="text"
                name="subDepartment"
                value={userData.subDepartment}
                onChange={handleInputChange}
                placeholder="Departamento al que pertenece"
                className="border rounded-md px-3 py-2"
              />
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {props.user ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
      )
    </div>
  );
}

export default Register;
