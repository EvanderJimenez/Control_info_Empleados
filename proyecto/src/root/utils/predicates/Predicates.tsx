import { EmployeesType } from '../../types/Employee.type';


export const EmployeeInDepartment = (Employee: EmployeesType, Boss: EmployeesType): boolean => {
    return Employee.idDepartment === Boss.idDepartment;
}
export const FoundEmployeeByName = (Employee: EmployeesType, name: string): boolean => {
    return Employee.name === name;
}
export const FoundEmployeeByJobPosition = (Employee: EmployeesType, JobPosition: string): boolean => {
    return Employee.jobPosition === JobPosition;
}
export const FoundEmployeeByCedula = (Employee: EmployeesType, Cedula: string): boolean => {
    return Employee.jobPosition === Cedula;
}
export const isEmail = (email: string): boolean => {
    const patron = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    return patron.test(email);
}
export const isNumber = (str: string): boolean => {
    return !isNaN(Number(str));
}
export const isString = (str: string): boolean => {
    return !/\d/.test(str);
}
