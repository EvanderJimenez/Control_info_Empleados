import React, { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetDepartmentById,
  startCreateDepartment,
  startGetDepartmentById,
  startUpdateDepartment,
} from "@/root/redux";
import TabsDepartments from "../tabsDepartments/TabsDepartments";
import { Department, Employee } from "@/root/interface/departments";

interface RegisterProps {
  user?: Department;
}

const newDtaDepart = {
  id: "",
  name: "",
  size: 0,
  location: "",
  idEmployee: "",
  leader: "",
  level: "",
  namesubDepartment: "",
  subDepartment: "",
  employees: {},
};

function MethodsDepartments(props: RegisterProps) {
  const dispatch = useDispatch();

  const departId = useSelector(selectGetDepartmentById);

  const dataDepart = useSelector(selectGetDepartmentById)

  const [data, setData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState<string>("");
  const [newEmployeeId, setNewEmployeeId] = useState<string>("");
  const [passId, setPassId] = useState<string>("");
  const [nameEmployee, setIdNameEmployee] = useState<string>("");
  const [nameDepart, setNameDepart] = useState<string>("");
  const [idEmployee, setIdEmployee] = useState<string>("");
  const [newEmployeeData, setNewEmployeeData] = useState<string>("");
  const [upDate, setUpDate] = useState<boolean | null>();
  const [departmentData, subdepartmentData] = useState<Department>(() => {
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
        namesubDepartment: "",
        subDepartment: "",
        employees: {},
      };
    }
  });

  useEffect(() => {
    if (passId) {
      subdepartmentData((prevDepartmentData) => ({
        ...prevDepartmentData,
        subDepartment: passId,
      }));
      toast.success("Correctly added department.");
    }
  }, [passId]);
  useEffect(() => {
    if (idEmployee) {
      subdepartmentData((prevDepartmentData) => ({
        ...prevDepartmentData,
        idEmployee: idEmployee,
      }));
      toast.success("Correctly added employee.");
    }
  }, [idEmployee]);
  useEffect(() => {
    if (nameDepart) {
      subdepartmentData((prevDepartmentData) => ({
        ...prevDepartmentData,
        namesubDepartment: nameDepart,
      }));
      toast.success("Correctly added employee.");
    }
  }, [nameDepart]);
  useEffect(() => {
    if (nameEmployee) {
      subdepartmentData((prevDepartmentData) => ({
        ...prevDepartmentData,
        leader: nameEmployee,
      }));
      toast.success("Correctly added employee.");
    }
  }, [nameEmployee]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    subdepartmentData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleDeleteEmployee = (employeeName: string | number) => {
    subdepartmentData((prevDepartmentData) => {
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

    if (
      !departmentData.name &&
      !departmentData.leader &&
      !departmentData.idEmployee
    ) {
      toast.error("Department name is not defined");
      return;
    }

    dispatch(startCreateDepartment(departmentData));
    subdepartmentData(newDtaDepart);
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!departmentData.name) {
      toast.error("Department name is not defined");
      return;
    }
    dispatch(startUpdateDepartment(departmentData.name, departmentData));
    subdepartmentData(newDtaDepart);
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
      id: newEmployeeId,
    };

    subdepartmentData((prevUserData) => ({
      ...prevUserData,
      employees: {
        ...prevUserData.employees,
        [newEmployee]: newEmployeeObject,
      },
    }));

    setNewEmployee("");
    setNewEmployeeData("");
    setNewEmployeeId("");
  };
  const handleGetDepartment = async (id: string) => {
    dispatch(startGetDepartmentById(id)); 
  };
  
  useEffect(() => {
    if (departId) {
      setdepartmentData(departId);
    }
  }, [departId]);
  

  useEffect(() => {
    if (departId) {
      subdepartmentData(departId);
    }
  }, [departId]);

  const handleUpdateEmployee = (
    employeeName: string,
    updatedEmployee: Employee
  ) => {
    subdepartmentData((prevDepartmentData) => {
      const updatedEmployees = {
        ...prevDepartmentData.employees,
        [employeeName]: updatedEmployee,
      };

      return {
        ...prevDepartmentData,
        employees: updatedEmployees,
      };
    });
  };
  return (
    <div>
      <TabsDepartments
        handleUpdateEmployee={handleUpdateEmployee}
        setPassId={setPassId}
        departmentsData={departmentData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleSubmitEmployee={handleSubmitEmployee}
        newEmployee={newEmployee}
        newEmployeeData={newEmployeeData}
        setNewEmployee={setNewEmployee}
        newEmployeeId={newEmployeeId}
        setNewEmployeeId={setNewEmployeeId}
        setNewEmployeeData={setNewEmployeeData}
        handleGetDepartment={handleGetDepartment}
        handleUpdate={handleUpdate}
        handleDeleteEmployee={handleDeleteEmployee}
        setPassIdEmployee={setIdEmployee}
        setIdNameEmployee={setIdNameEmployee}
        setNameDepart={setNameDepart}
      />
    </div>
  );
}

export default MethodsDepartments;
