import { Employee } from "@/root/types/Employee.type";

export const empProvider = async (searchTerm: string) => {
  let isDelete = false;
  try {
    console.log(searchTerm);
    const response = await fetch(`/api/employees/${searchTerm}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      isDelete = true;
      return isDelete;
    } else {
    }
  } catch (error) {
    console.error("Error deleting the employee, mor information about that error: ", error);
  }
};
