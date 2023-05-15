import { DeleteEmployee } from "@/root/types/Employee.type";

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
