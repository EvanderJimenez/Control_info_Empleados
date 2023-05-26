export const getDepartmentByIdProvider = async (searchTerm: string) => {

    const response = await fetch(`/api/departments/${searchTerm}`, {
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

export const getAllDepartmentProvider = async () => {

    const response = await fetch(`/api/departments`, {
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
}