import React, { useState, useEffect } from "react";
interface UserData {
  cedula: number;
  contrasena: string;
  correo: string;
  departamentoEmp: string;
  habilitado: boolean;
  jefe: string;
  nombre: string;
  puesto: string;
  sueldo: number;
}

export const ListEmployee = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData>({
    cedula: 0,
    contrasena: "",
    correo: "",
    departamentoEmp: "",
    habilitado: false,
    jefe: "",
    nombre: "",
    puesto: "",
    sueldo: 0,
  });

  useEffect(() => {
    fetch("/api/empleados")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []); //data

  return (
    <>
      {data.map((item) => (
        <div key={item.cedula} className="p-1 mt-5 border zoom ">
          <p className="font-bold">Nombre: {item.nombre}</p>
          <p className="mt-2">Cedula: {item.cedula}</p>
          <p className="mt-2">correo: {item.correo}</p>
          <p className="mt-2">Departamento: {item.departamentoEmp}</p>
          <p className="mt-2">Jefe: {item.jefe}</p>
          <p className="mt-2">
            Habilitado: <input type="checkbox" checked={item.habilitado} />
          </p>
          <button className="mt-4 px-4 py-2 bg-red-500  bg-red text-white rounded hover:bg-red-600">Eliminar</button>
          <button className="mt-4 px-4 py-2 bg-red-500 bg-blue text-white rounded hover:bg-red-600">Actualizar</button>
        </div>
      ))}
    </>
  );
};

export default ListEmployee;
