import React, { useState } from "react";
import { Department, Employee, Documents } from "@/root/interface/departments";

interface RegisterProps {
  depart: Department;
}

function Register(props: RegisterProps) {
  const [data, setData] = useState<Department[]>([]);
  const [isCheckedS, setIsCheckedS] = useState(false);
  const [actualizar, setActualizar] = useState<boolean | null>();
  const handleCheckboxChangeS = () => {
    setIsCheckedS(!isCheckedS);
  };
  const [DeparData, setDeparData] = useState<Department>(() => {
    if (props.depart) {
      setActualizar(true);
      return props.depart;
    } else {
      return {
        id: "",
        name: "",
        size: 0,
        location: "",
        idEmployee: "",
        leader: "",
        subDepartment: "",
        level: "",
        employees: {},
      };
    }
  });

  const [cambios, setCambios] = useState(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeparData((prevDeparData) => ({ ...prevDeparData, [name]: value }));
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`/api/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DeparData),
    })
      .then((res) => res.json())
      .then((updateddepar) => {
        setData((prevData) => {
          const newData = [...prevData];
          const deparIndex = newData.findIndex(
            (depar) => depar.name === updateddepar.name
          );
          if (deparIndex >= 0) {
            newData[deparIndex] = updateddepar;
          }
          return newData;
        });
      })

      .catch((error) => console.error("Error al actualizar usuario:", error));
  };

  return (
    <div>
      <form
        onSubmit={handleUpdate}
        className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div>
          <input
            type="text"
            name="name"
            value={DeparData.name}
            onChange={handleInputChange}
            placeholder="Nombre del Departamento"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="number"
            name="size"
            value={DeparData.size}
            onChange={handleInputChange}
            placeholder="Tamaño del Departamento"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="location"
            value={DeparData.location}
            onChange={handleInputChange}
            placeholder="Ubicacion del Departamento"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="idEmployee"
            value={DeparData.idEmployee}
            onChange={handleInputChange}
            placeholder="Area al que pertenece"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="leader"
            value={DeparData.leader}
            onChange={handleInputChange}
            placeholder="Lider del departamento"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="skills"
            value={DeparData.level}
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
              value={DeparData.subDepartment}
              onChange={handleInputChange}
              placeholder="Departamento al que pertenece"
              className="border rounded-md px-3 py-2"
            />
          )}

          <div>
            <div>
              <p className="font-bold mt-2">Empleados:</p>
              {Object.entries(DeparData.employees).map(([key, value]) => (
                <div key={key}>
                  <p>Name: {key}</p>
                  <input
                    type="text"
                    name={`des-${key}`}
                    value={value.des}
                    onChange={handleInputChange}
                    placeholder="Personal Information"
                    className="border rounded-md px-3 py-2"
                  />
                  <p>Personal Information: {value.des}</p>
                  {Object.entries(value.documents).map(([docKey, docValue]) => (
                    <div key={docKey}>
                      <p>Nombre del Documento: {docKey}</p>
                      <p>Tipo de Documento: {docValue.type}</p>
                      <p>
                        URL del Documento: <a href={docValue.url}>Download</a>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {props.depart ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
