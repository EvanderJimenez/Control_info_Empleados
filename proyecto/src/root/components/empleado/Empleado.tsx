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

  const handleDelete = (cedula: number) => {
    fetch(`/api/empleados/${cedula}/deshabilitar`, {
      method: "PUT",
    })
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item.cedula === cedula ? { ...item, habilitado: false } : item
          )
        );
      })
      .catch((error) =>
        console.error(`Error al deshabilitar el usuario ${cedula}:`, error)
      );
  };
  

  return (

    


<div className="p-4">

<div>
<div className="flex items-center justify-center h-screen">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" id="email">
          Correo Electrónico
        </label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Correo Electrónico" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" id="password">
          Contraseña
        </label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña" />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Iniciar Sesión
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Olvidé mi Contraseña
        </a>
      </div>
    </form>
  </div>
</div>
</div>

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

        <button className="bg-red-600" onClick={()=>handleDelete(item.cedula)}>Eliminar</button>


      </div>
    ))
  }
</div>
</div>

 );
}

export default Empleado