export interface Schedule {
  day: number;
  startTime: string;
  endTime: string;
}
export interface UserData {
  uid: number;
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
  option: string;
}
