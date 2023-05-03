import React, { useState } from "react";

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

interface RegisterProps {
  user: UserData;
  onCancel: () => void;
}

function Register(props: RegisterProps) {

  const [data, setData] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData>(() => {
    if (props.user) {
      return props.user;
    } else {
      return {
        cedula: 0,
        contrasena: "",
        correo: "",
        departamentoEmp: "",
        habilitado: false,
        jefe: "",
        nombre: "",
        puesto: "",
        sueldo: 0,
      };
    }
  });

  const [cambios, setCambios] = useState(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar que los campos no estén vacíos antes de enviar la solicitud POST
    /*     if (!userData.cedula || !userData.contrasena || !userData.correo || userData.nombre ) {
          console.error("Por favor, ingrese valores para todos los campos");
          return;
        } */
    userData.habilitado = true

    console.log("Nuevo usuario:", userData);

    fetch("/api/empleados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((newUser) => setData([...data, newUser]))
      .catch((error) => console.error("Error al crear nuevo usuario:", error));

    setUserData({
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
  };

  return (




    <form onSubmit={handleSubmit} className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
        <div className="flex flex-col items-center justify-center p-2">
          <label >Nombre</label>
          <input type="text" name="nombre" required value={userData.nombre} onChange={handleInputChange} className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red" id="name" />
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <label>Correo electrónico</label>
          <input type="email" name="correo" required value={userData.correo} onChange={handleInputChange} className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red" id="name" />
        </div>
        <div className="flex flex-col items-center  justify-center p-2">
          <label>Contraseña</label>
          <input type="password" name="contrasena" required value={userData.contrasena} onChange={handleInputChange} className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red" id="password" />
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <label>Cédula</label>
          <input type="number" name="cedula" required value={userData.cedula} onChange={handleInputChange} className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red" id="cedula" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {props.user ? "Actualizar" : "Guardar"}
        </button>

      </div>

    </form>

  );
};

export default Register;
