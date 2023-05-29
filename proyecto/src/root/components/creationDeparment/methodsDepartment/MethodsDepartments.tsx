import React, { useEffect, useState } from "react";
import { Department, Documents, Employee } from "@/root/interface/departments";
import CreationDepartment from "../../creationDeparment/CreationDepartment";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectGetDepartmentById, startCreateDepartment, startGetDepartmentById, startUpdateDepartment } from "@/root/redux";

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
  subDepartment: "",
  employees: {},
}

function MethodsDepartments(props: RegisterProps) {

  const dispatch = useDispatch()

  const departId = useSelector(selectGetDepartmentById)

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

    if (!departmentData.name && !departmentData.leader && !departmentData.idEmployee) {
      toast.error("Department name is not defined");
      return
    }

      dispatch(startCreateDepartment(departmentData))
      setdepartmentData(newDtaDepart);

  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      if (!departmentData.name) {
        toast.error("Department name is not defined");
        return
      }
      dispatch(startUpdateDepartment(departmentData.name,departmentData))
      setdepartmentData(newDtaDepart);
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

    dispatch(startGetDepartmentById(id))

  };

  useEffect(() => {
    if(departId){
      setdepartmentData(departId)
    }
  
  }, [departId])


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
