import React, { useState, useEffect } from "react";
interface UserData {
  name: string;
  size: number;
  location: string;
  area: string;
  leader: string;
  skills: [string];
  mainDepartment: string;
  subDepartment: string;
}

function EditDeparment() {
  const [data, setData] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    size: 0,
    location: "",
    area: "",
    leader: "",
    skills: "",
    mainDepartment: "",
    subDepartment: "",
  });

  useEffect(() => {
    fetch("/api/deparments")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []); //data

  return (
    <div className=" grid grid-cols-1 gap-4 scroll">
      {data.map((item) => (
        <div
          key={item.name}
          className="p-6 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 text-center "
        >
          <p className="font-bold">Nombre del Departamento: {item.name}</p>
          <p className="mt-2">Personas: {item.size}</p>
          <p className="mt-2">Ubicacion: {item.location}</p>
          {item.mainDepartment && (
            <p>Departamento Principal: {item.mainDepartment}</p>
          )}
          {item.subDepartment && <p>SubDepartamento : {item.subDepartment}</p>}
          <p className="mt-2">Jefe del Departamento: {item.leader}</p>
          <button className="mt-4 px-4 py-2 bg-green-500 bg-blue text-white rounded hover:bg-green-800">
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
}

export default EditDeparment;
