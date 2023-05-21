import { Brands, Schedule } from "../interface/employee";

export type DeleteEmployeeType = {
  id: string;
} | null;

export type EmployeesType = {
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
}

