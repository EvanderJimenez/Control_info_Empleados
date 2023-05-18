import React, { useState } from "react";
import { upLoadFile, upLoadImage } from "@/dataBase/firebase/firebase";
import { Department, Documents, Employee } from "@/root/interface/departments";

function RegisterDepartment() {
  const [isCheckedS, setIsCheckedS] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState<string>("");
  const [newDocuments, setNewDocuments] = useState<string>("");
  const [newUrl, setUrl] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [newEmployeeData, setNewEmployeeData] = useState<string>("");
  const [userData, setUserData] = useState<Department>({
    id: "",
    name: "",
    size: 0,
    location: "",
    idEmployee: "",
    leader: "",
    level: "",
    subDepartment: "",
    employees: {},
  });

  const handleInputChangeD = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const handleSubmitEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newEmployee || !newEmployeeData) {
      console.error("Please enter values for all employee fields");//TODO: You should erase all console log
      return;
    }

    const newEmployeeObject: Employee = {
      name: newEmployee,
      des: newEmployeeData,
      imageE: image,
      documents: {},
    };

    setUserData((prevUserData) => ({
      ...prevUserData,
      employees: {
        ...prevUserData.employees,
        [newEmployee]: newEmployeeObject,
      },
    }));

    setNewEmployee("");
    setNewEmployeeData("");
    setImage("");
  };
//TODO: move to other file
  const handleSubmitDocuments = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newDocuments || !newUrl) {
      console.error("Please enter values for all fields in the document");//TODO: You should erase all console log
      return;
    }

    const newDocumentsObject: Documents = {
      type: newDocuments,
      url: newUrl,
    };

    const selectedEmployee = userData.employees[newEmployee];

    if (selectedEmployee) {
      selectedEmployee.documents = {
        ...selectedEmployee.documents,
        [newDocuments]: newDocumentsObject,
      };

      setUserData((prevUserData) => ({
        ...prevUserData,
        employees: {
          ...prevUserData.employees,
          [newEmployee]: selectedEmployee,
        },
      }));

      setNewDocuments("");
      setUrl("");
    } else {//TODO: You should not use else or simplify the complex with reverse if
      console.error("The selected employee does not exist");//TODO: You should erase all console log
    }
  };//TODO: move to other file
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !userData.name ||
      !userData.size ||
      !userData.location ||
      !userData.idEmployee ||
      !userData.leader ||
      !userData.level
    ) {
      console.error("Please enter values for all fields");//TODO: You should erase all console log
      return;
    }

    fetch("/api/departments", {// You must not fetch in components
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUserData({
          id: "",
          name: "",
          size: 0,
          location: "",
          idEmployee: "",
          leader: "",
          level: "",
          subDepartment: "",
          employees: {},
        });
      })
      .catch((error) => console.error("Error creating new department:", error));//TODO: You should erase all console log
  };

  const handleCheckboxChangeS = () => {
    setIsCheckedS(!isCheckedS);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const url = await upLoadImage(file);
        setImage(url);
      } else {//TODO: You should not use else or simplify the complex with reverse if
        alert("Please select a file");
      }
    } catch (error) {
      alert("Failed to upload image");
    }
  };

  const handleDocumentsUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const url = await upLoadFile(file);
        setUrl(url);
      } else {//TODO: You should not use else or simplify the complex with reverse if
        alert("Please select a file");
      }
    } catch (error) {
      alert("Failed to upload file");
    }
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
          placeholder="Department Name"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="number"
          name="size"
          value={userData.size}
          onChange={handleInputChangeD}
          placeholder="Department Size"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="location"
          value={userData.location}
          onChange={handleInputChangeD}
          placeholder="Location of the Department"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="idEmployee"
          value={userData.idEmployee}
          onChange={handleInputChangeD}
          placeholder="Folio employ"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="leader"
          value={userData.leader}
          onChange={handleInputChangeD}
          placeholder="Boss of Department"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="level"
          value={userData.level}
          onChange={handleInputChangeD}
          placeholder="Level to which it belongs"
          className="border rounded-md px-3 py-2"
        />

        {isCheckedS && (
          <input
            type="text"
            name="subDepartment"
            value={userData.subDepartment}
            onChange={handleInputChangeD}
            placeholder="Department to which it belongs"
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
      <div className="space-y-4">
        <div>
          {Object.entries(userData.employees).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <span className="mr-2 font-bold">Name:</span>
              <span>{key}</span>
              <span className="ml-4 mr-2 font-bold">Information Personal:</span>
              <span>{value.des}</span>
              <button
                onClick={() => setNewEmployee(key)}
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      {/ TODO:You should separate this functional components in custom hooks or other small functions in differents files */}
        <form onSubmit={handleSubmitEmployee} className="space-y-4">
          <div className="flex items-center">
            <label htmlFor="newEmployee" className="mr-2 font-bold">
              Employees Name:
            </label>
            <input
              type="text"
              name="newEmployee"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
              placeholder="Employee's name"
              className="border rounded-md px-3 py-2"
            />
          </div>
          {image && <img src={image} alt="Uploaded image" />}
          <div className="flex items-center">
            <label htmlFor="image" className="mr-2 font-bold">
              Upload Image:
            </label>
            <input type="file" onChange={handleImageUpload} />
          </div>
          <div className="flex items-center">
            <label htmlFor="newEmployeeData" className="mr-2 font-bold">
              Information Personal:
            </label>
            <input
              type="text"
              name="newEmployeeData"
              value={newEmployeeData}
              onChange={(e) => setNewEmployeeData(e.target.value)}
              placeholder="Information Personal"
              className="border rounded-md px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>

        <div>
      {/ TODO:You should separate this functional components in custom hooks or other small functions in differents files */}
          <form onSubmit={handleSubmitDocuments} className="space-y-4">
            <div className="flex items-center">
              <label htmlFor="newDocuments" className="mr-2 font-bold">
                Document Name:
              </label>
              <input
                type="text"
                name="newDocuments"
                value={newDocuments}
                onChange={(e) => setNewDocuments(e.target.value)}
                placeholder="Document Name"
                className="border rounded-md px-3 py-2"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="documents" className="mr-2 font-bold">
                Upload Document:
              </label>
              <input type="file" onChange={handleDocumentsUpload} />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterDepartment;
