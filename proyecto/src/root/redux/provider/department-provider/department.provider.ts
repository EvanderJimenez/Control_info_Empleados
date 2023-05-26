export const getDepartmentByIdProvider = async (searchTerm: string) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const getAllDepartmentProvider = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
}