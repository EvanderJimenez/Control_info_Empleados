import React, { useState } from "react";

interface Schedule {
  day: number;
  startTime: string;
  endTime: string;
}

interface UserData {
  uid: number;
  name: string;
  firstSurname: string;
  secondSurname: string;
  cedula: number;
  phoneNumber: number;
  photo: string;
  jobPosition: string;
  salary: number;
  enabled: boolean;
  idDepartment: number;
  password: string;
  email: string;
  boss: string;
  schedule: Schedule[];
  option: string;
}

interface RegisterProps {
  user?: UserData;
  onCancel: () => void;
}

function Register(props: RegisterProps) {
  const [data, setData] = useState<UserData[]>([]);

  const [upDate, setUpDate] = useState<boolean | null>();

  const [userData, setUserData] = useState<UserData>(() => {
    if (props.user) {
      setUpDate(true);
      console.log(props.user);
      return props.user;
    } else {
      return {
        uid: 0,
        name: "",
        firstSurname: "",
        secondSurname: "",
        cedula: 0,
        phoneNumber: 0,
        photo: "",
        jobPosition: "",
        salary: 0,
        enabled: true,
        idDepartment: 0,
        password: "",
        email: "",
        boss: "",
        schedule: [],
        option: "register",
      };
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      uid: 0,
      name: "",
      firstSurname: "",
      secondSurname: "",
      cedula: 0,
      phoneNumber: 0,
      photo: "",
      jobPosition: "",
      salary: 0,
      enabled: true,
      idDepartment: 0,
      password: "",
      email: "",
      boss: "",
      schedule: [],
      option: "register",
    });
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Nuevo usuario:", userData);

    fetch(`/api/empleados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setData((prevData) => {
          const newData = [...prevData];
          const userIndex = newData.findIndex((user) => user.cedula === updatedUser.uid);
          if (userIndex >= 0) {
            newData[userIndex] = updatedUser;
          }
          return newData;
        });
        props.onCancel();
      })
      .catch((error) => console.error("Error al actualizar usuario:", error));
  };

  return (
    <div className = "flex justify-center items-center flex-col">
      {upDate ? (
        <div>
          <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
              <div className="flex flex-col items-center justify-center p-2">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={userData.name}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="name"
                />
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={userData.email}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="email"
                />
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <label>Jefe</label>
                <input
                  type="text"
                  name="boss"
                  required
                  value={userData.boss}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="boss"
                />
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <label>Puesto</label>
                <input
                  type="text"
                  name="jobPosition"
                  required
                  value={userData.jobPosition}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="jobPositions"
                />
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <label>Sueldo</label>
                <input
                  type="text"
                  name="salary"
                  required
                  value={userData.salary}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="salary"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {props.user ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
              <div className="flex flex-col items-center justify-center p-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={userData.email}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="email"
                />
              </div>
              <div className="flex flex-col items-center  justify-center p-2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={userData.password}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="password"
                />
              </div>
              <div className="flex flex-col items-center  justify-center p-2">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={userData.name}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="name"
                />
              </div>
              <div className="flex flex-col items-center  justify-center p-2">
                <label>Fist Username</label>
                <input
                  type="text"
                  name="firstSurname"
                  required
                  value={userData.firstSurname}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="firstSurname"
                />
              </div>
              <div className="flex flex-col items-center  justify-center p-2">
                <label>Second Username</label>
                <input
                  type="text"
                  name="secondSurname"
                  required
                  value={userData.secondSurname}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="secondSurname"
                />
              </div>
              <div className="flex flex-col items-center  justify-center p-2">
                <label>Phone number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  required
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
                  id="phoneNumber"
                />
              </div>
              <button type="submit" className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {props.user ? "update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
