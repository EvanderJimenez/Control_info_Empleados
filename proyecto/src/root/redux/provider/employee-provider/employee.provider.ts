import { UserData } from "@/root/interface/employee";
import { EmployeesType } from "@/root/types/Employee.type";

const deleteEmployeeProvider = async (searchTerm: string) => {

    const response = await fetch(`/api/employees/${searchTerm}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: { uid: string } = await response.json();
    return { id: data.uid };
};

const dismissByUidProvider = async (searchTerm: string) => {
    const response = await fetch(`/api/employees/by-uid/${searchTerm}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: { uid: string } = await response.json();

    return { id: data.uid };
};

const employeeListProvider = async () => {

    const response = await fetch("/api/employees");

    if (!response.ok) {
      throw new Error("Error with the list of employees");
    }

    const data = await response.json();

    const listEmployees: EmployeesType[] = Array.isArray(data)
      ? data.map(
          (listEmployee: any): EmployeesType => ({
            uid: listEmployee.uid,
            name: listEmployee.name,
            firstSurname: listEmployee.firstSurname,
            secondSurname: listEmployee.secondSurname,
            cedula: listEmployee.cedula,
            phoneNumber: listEmployee.phoneNumber,
            photo: listEmployee.photo,
            jobPosition: listEmployee.jobPosition,
            salary: listEmployee.salary,
            enabled: listEmployee.enabled,
            idDepartment: listEmployee.idDepartment,
            password: listEmployee.password,
            email: listEmployee.email,
            boss: listEmployee.boss,
            schedule: listEmployee.schedule,
            vacations: listEmployee.vacations,
            attendance: listEmployee.attendance
          })
        )
      : [];

    return listEmployees;
};

const createEmployeeProvider = async (searchTerm: EmployeesType) => {

    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchTerm),
    });


    if (!response.ok) {
      throw new Error("Error creating employee");
    }

    const data = await response.json();

    return data;
};

const upDatEmployeeProvider = async (
  searchUser: string,
  searchTerm: EmployeesType
) => {
    const response = await fetch(`/api/employees/${searchUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchTerm),
    });

    if (!response.ok) {
      throw new Error("Error updating employee");
    }

    const data = await response.json();

    return data;
};

const getEmployeeByUidProvider = async (searchTerm: string) => {
    const response = await fetch(`/api/employees/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error getting employee");
    }

    const data = await response.json();

    return data;

};

const getEmployeeByCedulaProvider = async (searchTerm: string) => {
    const response = await fetch(`/api/employees/by-cedula/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error getting employee");
    }

    const data = await response.json();

    return data;
};

const getEmployeeByNameProvider = async (searchTerm: string) => {
  try {
    const response = await fetch(`/api/employees/by-name/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error getting employee");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const loginProvider = async (searchTerm1: string, searchTerm2: string) => {
    const response = await fetch("/api/employees/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: searchTerm1,
        password: searchTerm2,
      }),
    });

    if (!response.ok) {
      throw new Error("Error getting employee");
    }

    const data = await response.json();

    return data;

};

const getByVariableProvider = async (
  searchTerm1: string,
  searchTerm2: string,
  searchTerm3: string

) => {

    const response = await fetch("/api/employees/by-variable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: searchTerm1,
        variable: searchTerm2,
        idDepartment: searchTerm3
      }),
    });

    if (!response.ok) {
      throw new Error("Error getting employee");
    }

    const data = await response.json();

    return data;
};

const getVacationsByUidProvider = async (searchTerm: string) => {
    const response = await fetch(`/api/employees/by-uid/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error getting vacations");
    }

    const data = await response.json();

    return data;
};

const getEmployeesByIdDepartProvider = async (searchTerm: string) => {
    const response = await fetch(
      `/api/employees/by-idDepartment/${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error getting vacations");
    }

    const data = await response.json();

    return data;
};

const getAllBossesProvider = async () => {

    const response = await fetch(`/api/employees/allBoss`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error getting vacations");
    }

    const data = await response.json();

    return data;

};

export const providerRedux = {
  getEmployeesByIdDepartProvider,
  getVacationsByUidProvider,
  getByVariableProvider,
  loginProvider,
  getEmployeeByNameProvider,
  getEmployeeByCedulaProvider,
  getEmployeeByUidProvider,
  upDatEmployeeProvider,
  createEmployeeProvider,
  employeeListProvider,
  dismissByUidProvider,
  deleteEmployeeProvider,
  getAllBossesProvider,
};
