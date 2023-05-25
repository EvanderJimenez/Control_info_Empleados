export interface Brands {
  idEmployee: string;
  cycle: { [key: string]: Cycle };
  hoursEmployee: { [Key: string]: HoursEmployee };
}

export interface HoursEmployee {
  hIni: string;
  hFin: string;
}
export interface Cycle {
  hours: { [key: string]: Hours };
}
export interface Hours {
  hFin: string;
  hIni: string;
}
