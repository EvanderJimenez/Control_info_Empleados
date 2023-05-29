import React, { useState } from "react";
import { Department, Documents, Employee } from "@/root/interface/departments";
import CreationDepartment from "../../creationDeparment/CreationDepartment";
import { toast } from "react-hot-toast";

interface RegisterProps {
  user?: Department;
}

function MethodsDepartments(props: RegisterProps) {
  const [data, setData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newDocuments, setNewDocuments] = useState<string>("");
  const [newUrl, setUrl] = useState<string>("");
  const [newEmployee, setNewEmployee] = useState<string>("");
  const [newEmployeeData, setNewEmployeeData] = useState<string>("");
  const [upDate, setUpDate] = useState<boolean | null>();
  const [departmentData, setdepartmentData] = useState<Department>(() => {
    if (props.user) {
      setUpDate(true);
      return props.user;
    } else {
      return {
        id: "",
        name: "",
        size: 0,
        location: "",
        idEmployee: "",
        leader: "",
        level: "",
        subDepartment: "",
        employees: {},
      };
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setdepartmentData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };
  const handleEditEmployee = (
    employeeName: string,
    updatedEmployee: Employee
  ) => {
    setdepartmentData((prevDepartmentData) => {
      const updatedEmployees = { ...prevDepartmentData.employees };
      updatedEmployees[employeeName] = updatedEmployee;

      return {
        ...prevDepartmentData,
        employees: updatedEmployees,
      };
    });
  };

  const handleSubmitDocuments = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newDocuments) {
      toast.error("Please enter values for all fields in the document");
      return;
    }

    const newDocumentsObject: Documents = {
      type: newDocuments,
      url: newUrl,
    };

    const selectedEmployee = departmentData.employees[newEmployee];

    if (selectedEmployee) {
      selectedEmployee.documents = {
        ...selectedEmployee.documents,
        [newDocuments]: newDocumentsObject,
      };

      setdepartmentData((prevUserData) => ({
        ...prevUserData,
        employees: {
          ...prevUserData.employees,
          [newEmployee]: selectedEmployee,
        },
      }));

      setNewDocuments("");
      setUrl("");
    } else {
      toast.error("The selected employee does not exist");
    }
  };
  const handleDeleteEmployee = (employeeName: string | number) => {
    setdepartmentData((prevDepartmentData) => {
      const updatedEmployees = { ...prevDepartmentData.employees };
      delete updatedEmployees[employeeName];

      return {
        ...prevDepartmentData,
        employees: updatedEmployees,
      };
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !departmentData.name ||
      !departmentData.size ||
      !departmentData.location ||
      !departmentData.level
    ) {
      toast.error("Please enter values for all fields");
      return;
    }

    fetch("/api/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(departmentData),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setdepartmentData({
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
      .catch((error) => toast.error("Error creating new department:", error));
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!departmentData.name) {
        throw new Error("Department name is not defined");
      }

      const response = await fetch(`/api/departments/${departmentData.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setData(updatedUser);
      } else {
        const errorResponse = await response.json();
        throw new Error(`Failed to update user: ${errorResponse.message}`);
      }

      setdepartmentData({
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
    } catch (error) {
      toast.error("Error updating user:");
    }
  };

  const handleSubmitEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newEmployee) {
      toast.error("Please enter values for all employee fields");
      return;
    }

    const newEmployeeObject: Employee = {
      name: newEmployee,
      des: newEmployeeData,
      imageE: "",
      documents: {},
    };

    setdepartmentData((prevUserData) => ({
      ...prevUserData,
      employees: {
        ...prevUserData.employees,
        [newEmployee]: newEmployeeObject,
      },
    }));

    setNewEmployee("");
    setNewEmployeeData("");
  };
  const handleGetDepartment = async (id: string) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setdepartmentData(data);
      } else {
        throw new Error("Error acquiring information");
      }
    } catch (error) {
      toast.error("Error getting department data");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {upDate ? (
        <CreationDepartment
          departmentsData={departmentData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleSubmitEmployee={handleSubmitEmployee}
          newEmployee={newEmployee}
          newEmployeeData={newEmployeeData}
          setNewEmployee={setNewEmployee}
          setNewEmployeeData={setNewEmployeeData}
          handleGetDepartment={handleGetDepartment}
          handleUpdate={handleUpdate}
          handleSubmitDocuments={handleSubmitDocuments}
          newDocuments={newDocuments}
          setNewDocuments={setNewDocuments}
        />
      ) : (
        <CreationDepartment
          departmentsData={departmentData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleSubmitEmployee={handleSubmitEmployee}
          newEmployee={newEmployee}
          newEmployeeData={newEmployeeData}
          setNewEmployee={setNewEmployee}
          setNewEmployeeData={setNewEmployeeData}
          handleGetDepartment={handleGetDepartment}
          handleUpdate={handleUpdate}
          handleSubmitDocuments={handleSubmitDocuments}
          newDocuments={newDocuments}
          setNewDocuments={setNewDocuments}
        />
      )}
    </div>
  );
}

export default MethodsDepartments;
