import { setUserId } from "firebase/analytics";
import React, { useState, useEffect } from "react";
import Register from "../registerDepartment/register";
interface UserData {
  id: string;
  name: string;
  size: number;
  location: string;
  area: string;
  leader: string;
  skills: string;
  mainDepartment: string;
  subDepartment: string;
  nivel: string;
}

function EditDeparment() {
  const [data, setData] = useState<UserData[]>([]);
  const [actualiza, setActualiza] = useState<boolean | null>(null);
  const [idDoc, setidDoc] = useState("");
  const [dataI, setDta] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    size: 0,
    location: "",
    area: "",
    leader: "",
    skills: "",
    mainDepartment: "",
    subDepartment: "",
    nivel: "",
  });
  /* const getOne = async (idDoc)=>{
 try {
  const docRef = doc(db,"deparments",idDoc)
  const docSnap = await get(docRef)
  setidDoc(docSnap.data())
 } catch (error) {
  
 }
  }*/
  useEffect(() => {
    if (idDoc !== "") {
      // getOne(idDoc);
    }
  }, [idDoc]);
  useEffect(() => {
    fetch("/api/deparments")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []); //data

  const handleUpdate = async (id: string) => {
    try {
      console.log(id);
      const response = await fetch("/api/deparments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setActualiza(true);
        setDta(data);
        console.log(data);
        <Register depar={userData} />;
      } else {
        throw new Error("Error al adquirir la informacion");
      }
    } catch (error) {
      console.error("Error al obtener los datos del departamento", error);
    }
  };

  return (
    <div className=" grid grid-cols-1 gap-4 scroll">
      {userData ? (
        <Register depar={userData} />
      ) : (
        <div>
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
              {item.subDepartment && (
                <p>SubDepartamento : {item.subDepartment}</p>
              )}
              <p className="mt-2">Jefe del Departamento: {item.leader}</p>
              <button
                className="mt-4 px-4 py-2 bg-green-500 bg-blue text-white rounded hover:bg-green-800"
                onClick={() => handleUpdate(item.id)}
              >
                Actualizar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditDeparment;
