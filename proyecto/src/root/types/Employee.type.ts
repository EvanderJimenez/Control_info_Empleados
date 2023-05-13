export type Employee = {
  id: string;
  nombre: string;
  cedula: number;
  contrasena: string;
  departamentoEmp: string;
  habilitado: boolean;
  jefe: string;
  puesto: string;
  sueldo: number;
};

export type DeleteEmployee = {
  id: string;
} | null;
