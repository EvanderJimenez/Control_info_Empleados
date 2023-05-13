import React, { useState, useEffect } from "react";
import Register from "../updateDepartment/register";
import { Department } from "@/root/interface/departments";

function EditDepartment() {
  const [data, setData] = useState<Department[]>([]);
  const [update, setUpdate] = useState<boolean | null>(null);
  const [idDoc, setidDoc] = useState("");
  const [dataI, setDta] = useState<Department[]>([]);
  const [userData, setUserData] = useState<Department>({
    id: "",
    name: "",
    size: 0,
    location: "",
    area: "",
    leader: "",
    level: "",
    mainDepartment: false,
    subDepartment: "",
    employees: {},
  });

  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => setData(data));
    console.log(data);
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      console.log(id);
      const response = await fetch(`/api/departments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setUpdate(true);
        setDta(data);
        console.log(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      console.error("Error getting department data", error);
    }
  };

  return (
    <div className=" grid grid-cols-1 gap-4 scroll">
      {userData ? (
        <div>
          {data.map((item) => (
            <div
              key={item.name}
              className="p-6 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 text-center "
            >
              <p className="font-bold">Name Department: {item.name}</p>
              <p className="mt-2">People: {item.size}</p>
              <p className="mt-2">Location: {item.location}</p>

              {item.mainDepartment && (
                <p>Main Department: {item.mainDepartment}</p>
              )}
              {item.subDepartment && (
                <p> Secondary Department: {item.subDepartment}</p>
              )}
              <p className="mt-2">Boss of Department: {item.leader}</p>
              <button
                className="mt-4 px-4 py-2 bg-green-500 bg-blue text-white rounded hover:bg-green-800"
                onClick={() => handleUpdate(item.id)}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Register depart={userData} />
      )}
    </div>
  );
}

export default EditDepartment;
