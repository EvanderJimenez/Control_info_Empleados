import React, { useState, useEffect } from 'react'
import "../../../styles/listEmployee.module.css"
import axios from 'axios';
import Register from '../register/Register';
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

const ListEmployee = () => {


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
  const [actualiza, setActualiza] = useState<boolean | null>(null);

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);


  useEffect(() => {

    fetch("/api/empleados")
      .then((res) => res.json())
      .then((data) => setData(data))

  }, [])

  const handleDelete = async (correo: string) => {
    try {
      const response = await fetch(`/api/empleados`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      });

      if (response.ok) {
        //error response
      } else {

      }

    } catch (error) {
      console.error('Error al actualizar el empleado', error);
    }

  };


  const handleUpdate = async (email: string, password: string) => {

    try {
      console.log("Datos enviados:", { email, password })
      const response = await fetch('/api/empleados',{
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: email,
      contrasena: password
    })
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setActualiza(true);
        setSelectedUser(data)
      } else {
        throw new Error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al obtener los datos del empleado', error);
    }
  }

  return (
    <div className='grid grid-cols-1 gap-4 scroll'>
      {selectedUser ? (
        <Register user={selectedUser} onCancel={() => setSelectedUser(null)} />
      ) : (
        <>
          {data.map((item) => (
            <div key={item.cedula} className="p-4 border border-gray-300 rounded-lg">
              <p className="font-bold">Nombre: {item.nombre}</p>
              <p className="mt-2">Cedula: {item.cedula}</p>
              <p className="mt-2">Correo: {item.correo}</p>
              <p className="mt-2">Departamento: {item.departamentoEmp}</p>
              <p className="mt-2">Jefe: {item.jefe}</p>
              <p className="mt-2">Habilitado: <input readOnly type="checkbox" checked={item.habilitado} /></p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(item.correo)}
              >
                Eliminar
              </button>

              <button
                className="mt-4 px-4 py-2 bg-red-500 bg-blue text-white rounded hover:bg-red-600"
                onClick={() => handleUpdate(item.correo,item.contrasena)}
              >
                Actualizar
              </button>

            </div>
          ))}
        </>
      )}
    </div>
  );

}

export default ListEmployee
