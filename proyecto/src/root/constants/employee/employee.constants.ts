import { PendingRequest, PendingRequestJustifications } from "@/root/interface/employee";

 export const initialDataEmployee = {
    uid: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    cedula: "",
    phoneNumber: "",
    photo: "",
    jobPosition: "",
    salary: "",
    enabled: true,
    idDepartment: "0",
    password: "",
    email: "",
    boss: "",
    schedule: [],
    vacations: {},
    attendance: {},
    files: {}
  }

  export const pendingRequest: PendingRequest = {
    key: "",
    employeeName: "",
    employeeUID: "",
    dateStart: "",
    dateEnd: "",
    description: "",
    approved: "",
  };

  export const pendingRequestJustification: PendingRequestJustifications = {
    key: "",
    employeeName: "",
    employeeUID: "",
    startTime: "",
    endTime: "",
    justificationFin: "",
    justificationIni: "",
    state: "",
  };