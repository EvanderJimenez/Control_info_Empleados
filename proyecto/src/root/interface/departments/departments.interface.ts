export interface Documents {
  type: string;
  url: string;
}
export interface Employee {
  name: string;
  des: string;
  imageE: string;
  documents: { [key: string]: Documents };
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
