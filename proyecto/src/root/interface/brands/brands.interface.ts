export interface Brands { // TODO: Improve this name, dont use plural
  idEmployee: string;
  cycle: { [key: string]: Cycle };
}
export interface Cycle {
  hours: { [key: string]: Hours };
}
export interface Hours { // TODO: Improve this name, like HourRange
  hFin: string;
  hIni: string;
}
