import { LaborRegistration } from "@/root/interface/brands";
import { Brands } from "@/root/interface/employee";

const createBrandsProvider = async (searchTerm: LaborRegistration) => {
  const response = await fetch("/api/brands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchTerm),
  });

  if (!response.ok) {
    throw new Error("Error creating brand");
  }

  const data = await response.json();

  return data;
};

const getAllBrandsProvider = async () => {
  const response = await fetch(`/api/brands`, {
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

const getBrandsByDocIdProvider = async (searchTerm: string) => {
  const response = await fetch(`/api/brands/${searchTerm}`, {
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

const updateBrandsByIdProvider = async (
  searchTerm1: string,
  searchTerm2: LaborRegistration
) => {
  const response = await fetch(`/api/brands/${searchTerm1}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchTerm2),
  });

  if (!response.ok) {
    throw new Error("Error updating ");
  }

  const data = await response.json();

  return data;
};

const getBrandsDocByEmployeeIdProvider = async (searchTerm: string) => {
  const response = await fetch(`/api/brands/${searchTerm}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(JSON.stringify(response))
  if (!response.ok || Object.keys(response).length === 0) {
    return null;
  }
  console.log(JSON.stringify(response))
  const data = await response.json();

  return data;
};

export const brandProvider = {
  getAllBrandsProvider,
  getBrandsByDocIdProvider,
  getBrandsDocByEmployeeIdProvider,
  updateBrandsByIdProvider,
  createBrandsProvider,
};
