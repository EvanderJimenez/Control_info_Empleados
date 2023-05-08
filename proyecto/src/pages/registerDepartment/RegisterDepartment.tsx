import React, { useState } from "react";

interface Department {
  name: string;
  size: number;
  location: string;
  area: string;
  leader: string;
  skills: string;
  mainDepartment: boolean;
  subDepartment: string;
  empleados: [string];
}

function RegisterDepartment() {
  const [isCheckedS, setIsCheckedS] = useState(false);
  const [newEmployee, setNewEmployee] = useState<string>("");
  const [userData, setUserData] = useState<Department>({
    name: "",
    size: 0,
    location: "",
    area: "",
    leader: "",
    skills: "",
    mainDepartment: false,
    subDepartment: "",
    empleados: [" "],
  });

  const handleInputChangeD = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !userData.name ||
      !userData.size ||
      !userData.location ||
      !userData.area ||
      !userData.leader ||
      !userData.skills
    ) {
      console.error("Por favor, ingrese valores para todos los campos");
      return;
    }

    console.log("Nuevo usuario:", userData);
    console.log(userData.empleados);
    fetch("/api/deparments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((newUser) => {
        console.log("Nuevo departamento creado:", newUser);
        setUserData({
          name: "",
          size: 0,
          location: "",
          area: "",
          leader: "",
          skills: "",
          mainDepartment: false,
          subDepartment: "",
          empleados: [" "],
        });
      })
      .catch((error) =>
        console.error("Error al crear nuevo departamento:", error)
      );
  };

  const handleCheckboxChangeS = () => {
    setIsCheckedS(!isCheckedS);
  };
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1"
      >
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChangeD}
          placeholder="Nombre del Departamento"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="number"
          name="size"
          value={userData.size}
          onChange={handleInputChangeD}
          placeholder="Tamaño del Departamento"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="location"
          value={userData.location}
          onChange={handleInputChangeD}
          placeholder="Ubicacion del Departamento"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="area"
          value={userData.area}
          onChange={handleInputChangeD}
          placeholder="Area al que pertenece"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="leader"
          value={userData.leader}
          onChange={handleInputChangeD}
          placeholder="Lider del departamento"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="skills"
          value={userData.skills}
          onChange={handleInputChangeD}
          placeholder="Habilidades"
          className="border rounded-md px-3 py-2"
        />
        <label htmlFor="mainDepartment" className="flex items-center">
          <input
            type="checkbox"
            name="mainDepartment"
            checked={userData.mainDepartment}
            onChange={() =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                mainDepartment: !prevUserData.mainDepartment,
              }))
            }
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          <span className="ml-2 text-gray-700">
            {userData.mainDepartment
              ? "Departamento Principal"
              : "Departamento Secundario"}
          </span>
        </label>

        {!userData.mainDepartment && (
          <>
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
                onChange={handleInputChangeD}
                placeholder="Departamento al que pertenece"
                className="border rounded-md px-3 py-2"
              />
            )}
          </>
        )}
        <input
          type="text"
          name="newEmployee"
          value={newEmployee}
          onChange={(e) => setNewEmployee(e.target.value)}
          placeholder="Nombre del empleado"
          className="border rounded-md px-3 py-2"
        />
        <button
          type="button"
          onClick={() => {
            setUserData((prevUserData) => ({
              ...prevUserData,
              empleados: [...prevUserData.empleados, newEmployee],
            }));
            setNewEmployee("");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar empleado
        </button>
        <input type="file" onChange={handleImageUpload} />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default RegisterDepartment;
