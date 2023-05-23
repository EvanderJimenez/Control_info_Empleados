export const getDepartmentByIdProvider = async (searchTerm: string) => {
  try {
    console.log(searchTerm);
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
