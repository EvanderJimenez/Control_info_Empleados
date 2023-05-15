export interface Brands {
  idEmployee: string;
  cycle: { [key: string]: Cycle };
}
export interface Cycle {
  hours: { [key: string]: Hours };
}
export interface Hours {
  hFin: string;
  hIni: string;
}
