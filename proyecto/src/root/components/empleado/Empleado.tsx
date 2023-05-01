import { useEffect, useState } from "react";

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

function Empleado() {
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
    .then((data) => setData(data))

  }, []) //data
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar que los campos no estén vacíos antes de enviar la solicitud POST
    if (!userData.cedula || !userData.contrasena || !userData.correo || !userData.departamentoEmp ||
        !userData.habilitado || !userData.jefe || !userData.nombre || !userData.puesto || !userData.sueldo) {
      console.error("Por favor, ingrese valores para todos los campos");
      return;
    }

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
<div className="p-4">
  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <input type="number" name="cedula" value={userData.cedula} onChange={handleInputChange} placeholder="Cédula" className="border rounded-md px-3 py-2" />
    <input type="password" name="contrasena" value={userData.contrasena} onChange={handleInputChange} placeholder="Contraseña" className="border rounded-md px-3 py-2" />
    <input type="email" name="correo" value={userData.correo} onChange={handleInputChange} placeholder="Correo" className="border rounded-md px-3 py-2" />
    <input type="text" name="departamentoEmp" value={userData.departamentoEmp} onChange={handleInputChange} placeholder="Departamento" className="border rounded-md px-3 py-2" />
    <label htmlFor="habilitado" className="flex items-center">
      <input type="checkbox" name="habilitado" checked={userData.habilitado} onChange={() => setUserData((prevUserData) => ({ ...prevUserData, habilitado: !prevUserData.habilitado }))} className="form-checkbox h-4 w-4 text-blue-500" />
      <span className="ml-2 text-gray-700">Habilitado</span>
    </label>
    <input type="text" name="jefe" value={userData.jefe} onChange={handleInputChange} placeholder="Jefe" className="border rounded-md px-3 py-2" />
    <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} placeholder="Nombre" className="border rounded-md px-3 py-2" />
    <input type="text" name="puesto" value={userData.puesto} onChange={handleInputChange} placeholder="Puesto" className="border rounded-md px-3 py-2" />
    <input type="number" name="sueldo" value={userData.sueldo} onChange={handleInputChange} placeholder="Sueldo" className="border rounded-md px-3 py-2" />
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
  </form>
  <div>
  {
    data.map((item) =>(
      <div key={item.cedula} className="border-b-2 py-2">
        <p className="font-bold">Nombre: {item.nombre}</p>
        <p className="text-gray-600">Cedula: {item.cedula}</p>
        <p className="text-gray-600">Departamento: {item.departamentoEmp}</p>
        <p className="text-gray-600">Jefe: {item.jefe}</p>
        <p>Habilitado: <input type="checkbox" checked={item.habilitado} /></p>

        <button className="bg-green-500">Actualizar</button>


      </div>
    ))
  }
</div>




</div>

);
}

export default Empleado