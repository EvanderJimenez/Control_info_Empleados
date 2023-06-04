
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

export interface InformationPage {
  title: string;
  paragraph: string;
  img: string;
}
export interface FirstPagePDFInformation {
  title: string;
  createdBy: string;
  dateCreated: Date;
  filterUsed: string;
}
export interface PendingRequest {
  key: string;
  employeeName: string;
  employeeUID: string;
  dateStart: string;
  dateEnd: string;
  description: string;
  approved: string;
}

export interface PendingRequestJustifications {
  key: string;
  employeeName: string;
  employeeUID: string;
  endTime: string;
  justificationFin: string;
  justificationIni: string;
  startTime: string;
  state: string;
}


export interface InputInterface {
  labelFloat: string;
  type: string;
  id: string;
  name:string;
  value:string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface Attendance {
  startTime: string;
  endTime: string;
  justificationIni: string;
  justificationFin: string;
  state: string;
}
