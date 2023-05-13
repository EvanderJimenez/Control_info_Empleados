import { setUserId } from "firebase/analytics";
import React, { useState, useEffect } from "react";
import Register from "../registerDepartment/register";
interface Documents {
  type: string;
  url: string;
}
interface Employee {
  name: string;
  des: string;
  imageE: string;
  documents: { [key: string]: Documents };
}
interface UserData {
  id: string;
  name: string;
  size: number;
  location: string;
  area: string;
  leader: string;
  level: string;
  mainDepartment: boolean;
  subDepartment: string;
  employees: { [key: string]: Employee };
}

function EditDepartment() {
  const [data, setData] = useState<UserData[]>([]);
  const [update, setUpdate] = useState<boolean | null>(null);
  const [idDoc, setidDoc] = useState("");
  const [dataI, setDta] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData>({
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
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      console.log(id);
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
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
        <Register depart={userData} />
      ) : (
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
      )}
    </div>
  );
}

export default EditDepartment;
