import { Employee } from "@/root/types/Employee.type";

export const empProvider = async (searchTerm: string) => {
  try {
    console.log(searchTerm)
    const response = await fetch(`/api/employees/${searchTerm}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setData(data.filter(item => item.uid !== searchTerm));
    } else {
    }
  } catch (error) {
    console.error("Error al eliminar el empleado", error);
  }
};

