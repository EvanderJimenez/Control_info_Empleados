import React, { useState, useEffect } from "react";
interface depar {
  name: string;
  size: number;
  location: string;
  area: string;
  leader: string;
  skills: [string];
  mainDepartment: string;
  subDepartment: string;
}

function RegisterDepartment() {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedS, setIsCheckedS] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [data, setData] = useState<depar>([]);
  const [userData, setUserData] = useState<depar>({
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
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []); //data
  const handleInputChangeD = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar que los campos no estén vacíos antes de enviar la solicitud POST
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

    fetch("/api/deparments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((newUser) => setData([...data, newUser]))
      .catch((error) =>
        console.error("Error al crear nuevo departamento:", error)
      );

    setUserData({
      name: "",
      size: 0,
      location: "",
      area: "",
      leader: "",
      skills: "",
      mainDepartment: "",
      subDepartment: "",
    });
  };

  const handleAddName = () => {
    setNames([...names, name]);
    setName("");
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChangeS = () => {
    setIsCheckedS(!isCheckedS);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
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
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Departamento Principal
        </label>
        {isChecked && (
          <input
            type="text"
            name="mainDepartment"
            value={userData.mainDepartment}
            onChange={handleInputChangeD}
            placeholder="Departamento principal"
            className="border rounded-md px-3 py-2"
          />
        )}

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
