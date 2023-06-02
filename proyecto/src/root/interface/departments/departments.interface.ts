export interface Employee {
  name: string;
  des: string;
  id: string;
}

export interface Department {
  id: string;
  name: string;
  size: number;
  location: string;
  idEmployee: string;
  leader: string;
  level: string;
  subDepartment: string;
  employees: { [key: string]: Employee };
}
