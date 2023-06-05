import { Attendance } from './../interface/employee/employee.interface';
import { Brands, Schedule } from "../interface/employee";

export type DeleteEmployeeType = {
  id: string;
} | null;

export type EmployeesType = {
  uid: string;
  name: string;
  firstSurname: string;
  secondSurname: string;
  cedula: string;
  phoneNumber: string;
  photo: string;
  jobPosition: string;
  salary: string;
  enabled: boolean;
  idDepartment: string;
  password: string;
  email: string;
  boss: string;
  vacations: { [Key: string]: Vacations };
  attendance:{ [Key: string]: Attendance };
  files: { [Key: string]: Files };

}

export type Files = {
  name: string;
  urlFile: string;
  type: string
}

export type Vacations = {
  dateStart : string
  dateEnd: string
  description: string
  approved: string
}

