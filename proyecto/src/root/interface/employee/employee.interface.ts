export interface Schedule {
  day: number | string;
  startTime: string;
  endTime: string;
}
export interface UserData {
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
  idDepartment: number;
  password: string;
  email: string;
  boss: string;
  schedule: Schedule[];
  brands: Brands[];
  option: string;
}

export interface LoginEP {
  email: string;
  password: string;
}

export interface Brands{

  date: string,
  startTime: string,
  endTime: string,
  justification: string,
  finished: boolean

}
export interface EmployeePage {
  name: string;
  department: string;
  entryTime: string;
  exitTime: string;

}
