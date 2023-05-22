
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
  idDepartment: string;
  password: string;
  email: string;
  boss: string; //
  schedule: Schedule[];
  brands: Brands[];
  option: string;
}

export interface LoginEP {
  email: string;
  password: string;
}

export interface Brands {
  date: string;
  startTime: string;
  endTime: string;
  justification: string;
  finished: boolean;
}

export interface Row {
  name: string;
  cedula: number;
  email: string;
  late: number;
}

export interface TableProps {
  rows: Row[];
}
export interface RowSchedule {
  name: string;
  cedula: number;
  entryTime: string;
  exitTime: string;
}
export interface TableScheduleProps {
  rows: RowSchedule[];
}
export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface InformationPage{
  title: string,
  paragraph: string,
  img: string
}
