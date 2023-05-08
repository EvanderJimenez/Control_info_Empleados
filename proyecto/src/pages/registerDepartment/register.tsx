import React, { useState } from "react";

interface DeparData {
  id: string;
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
  depar: DeparData;
}

function Register(props: RegisterProps) {
  const [data, setData] = useState<DeparData[]>([]);
  const [isCheckedS, setIsCheckedS] = useState(false);
  const [actualizar, setActualizar] = useState<boolean | null>();
  const handleCheckboxChangeS = () => {
    setIsCheckedS(!isCheckedS);
  };
  const [DeparData, setDeparData] = useState<DeparData>(() => {
    if (props.depar) {
      setActualizar(true);
      return props.depar;
    } else {
      return {
        id: "",
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

  const [cambios, setCambios] = useState(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeparData((prevDeparData) => ({ ...prevDeparData, [name]: value }));
  };
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`/api/deparments`, {
      method: "PUT",
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
    console.log(DeparData);
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
            name="area"
            value={DeparData.area}
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
            value={DeparData.skills}
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {props.depar ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
