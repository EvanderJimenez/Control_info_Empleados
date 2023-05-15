import { DeleteEmployee,ListEmployees } from "@/root/types/Employee.type";

export const employeeProvider = async (searchTerm: string): Promise<DeleteEmployee | undefined> => {
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


