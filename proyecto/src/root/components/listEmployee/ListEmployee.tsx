import React, { useState, useEffect } from "react";
import Register from "../register/Register";

export interface Schedule {
  day: number;
  startTime: string;
  endTime: string;
}

interface UserData {
  uid: number;
  name: string;
  firstSurname: string;
  secondSurname: string;
  cedula: number;
  phoneNumber: number;
  photo: string;
  jobPosition: string;
  salary: number;
  enabled: boolean;
  idDepartment: number;
  password: string;
  email: string;
  boss: string;
  schedule: Schedule[];
  option: string;
}

const ListEmployee = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData>({
    uid: 0,
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
    option: "",
  });
  const [actualiza, setActualiza] = useState<boolean | null>(null);

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleDelete = async (email: string) => {
    console.log(email);
    try {
      const response = await fetch(`/api/empleados`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        //error response
      } else {
      }
    } catch (error) {
      console.error("Error al actualizar el empleado", error);
    }
  };

  const handleUpdate = async (uid: number) => {
    try {
      const response = await fetch(`/api/employees?uid=${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setActualiza(true);
        setSelectedUser(data);
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al obtener los datos del empleado", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 scroll">
      {selectedUser ? (
        <Register user={selectedUser} onCancel={() => setSelectedUser(null)} />
      ) : (
        <>
          {data.map((item) => (
            <div key={item.uid} className="p-4 border border-gray-300 rounded-lg">
              <p className="font-bold">Nombre: {item.name}</p>
              <p className="mt-2">Cedula: {item.cedula}</p>
              <p className="mt-2">Correo: {item.email}</p>
              <p className="mt-2">Departamento: {item.idDepartment}</p>
              <p className="mt-2">Jefe: {item.boss}</p>
              <p className="mt-2">
                Habilitado: <input readOnly type="checkbox" checked={item.enabled} />
              </p>
              <button className="mt-4 px-4 py-2 bg-red-500 bg-red text-white rounded hover:bg-red-600" onClick={() => handleDelete(item.email)}>
                Eliminar
              </button>

              <button className="mt-4 px-4 py-2 bg-red-500 bg-blue text-white rounded hover:bg-red-600" onClick={() => handleUpdate(item.uid)}>
                Actualizar
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListEmployee;
