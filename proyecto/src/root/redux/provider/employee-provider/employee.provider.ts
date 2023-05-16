import { UserData } from "@/root/interface/employee";
import { DeleteEmployee,ListEmployees } from "@/root/types/Employee.type";

export const employeeProvider = async (searchTerm: string) => {
  try {
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

  } catch (error) {
    console.error("Error deleting the employee, mor information about that: ", error);
    return;
  }
};
export const employeeListProvider = async () => {
  try {
    const response = await fetch("/api/employees");

    if (!response.ok) {
      throw new Error("Error with the list of employees");
    }

    const data = await response.json();

    const listEmployees: ListEmployees[] = Array.isArray(data)
      ? data.map((listEmployee: any): ListEmployees => ({
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
          brands: listEmployee.brands,
        }))
      : [];

    return listEmployees;
  } catch (error) {
    console.error("Error fetching the list of employees:", error);
    throw error;
  }
};

export const createEmployees = async (searchTerm: UserData) => {

  try {
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


  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

export const upDatEmployeeProvider = async (searchUser: string,searchTerm: UserData) =>{

  try {
    const response = await fetch(`/api/employees/${searchUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchTerm)
    })

    if (!response.ok) {
      throw new Error("Error uodating employee");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }

}

