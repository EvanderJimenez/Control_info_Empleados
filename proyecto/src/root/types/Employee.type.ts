import { Brands, Schedule } from "../interface/employee";

export type DeleteEmployee = {
  id: string;
} | null;

export type ListEmployees = { //TODO: types always will named in singular, maybe EmployeeList, but I expected an Array with this name
  uid: string;
  name: string;
  firstSurname: string;
  secondSurname: string;
  cedula: number;
  phoneNumber: number;
  photo: string;
  jobPosition: string;
  salary: number;
  enabled: boolean;
  idDepartment: string;
  password: string;
  email: string;
  boss: string;
  schedule: Schedule[];
  brands: Brands[];
}