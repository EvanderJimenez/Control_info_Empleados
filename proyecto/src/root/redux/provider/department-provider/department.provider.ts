import { Department } from "@/root/interface/departments";
import { DepartmentType } from "@/root/types/Department.type";

const getDepartmentByIdProvider = async (searchTerm: string) => {
  const response = await fetch(`/api/departments/${searchTerm}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error getting depart");
  }

  const data = await response.json();

  return data;
};

const getAllDepartmentProvider = async () => {
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
};
const getDepartmentsByPageProvider = async (pageSize: number, page: number) => {
  const response = await fetch(
    `/api/departments/by-page?pageSize=${pageSize}&currentPage=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error getting employee");
  }

  const data = await response.json();

  return data;
};

const updateDepartmentByIdProvider = async (
  searchTerm1: string,
  searchTerm2: Department
) => {
  const response = await fetch(`/api/departments/${searchTerm1}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchTerm2),
  });

  if (!response.ok) {
    throw new Error("Error updating depart");
  }

  const data = await response.json();

  return data;
};

const getDepartmentByDocIdProvider = async (searchTerm: string) => {
  const response = await fetch(`/api/departments/${searchTerm}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};

const createDepartmentProvider = async (searchTerm: DepartmentType) => {
  const response = await fetch("/api/departments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchTerm),
  });

  if (!response.ok) {
    throw new Error("Error creating depart");
  }

  const data = await response.json();

  return data;
};

export const departProvider = {
  getAllDepartmentProvider,
  getDepartmentByIdProvider,
  updateDepartmentByIdProvider,
  getDepartmentByDocIdProvider,
  createDepartmentProvider,
  getDepartmentsByPageProvider,
};
