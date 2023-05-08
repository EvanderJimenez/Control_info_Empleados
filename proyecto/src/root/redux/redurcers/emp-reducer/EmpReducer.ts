import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../../types/Employee.type";

interface EmpState {
  Employees: Employee[];
}

type EmployeeAction = {
  type: string;
  id: number;
  name?: string;
};

//We declared the initial state for the reducer
export const initialState: EmpState = {
  Employees: [],
};

export const EmployeeSlice = createSlice({
  name: "Emp",
  initialState,

  reducers: {
    DeleteEmp: (state, action: PayloadAction<any>) => {
      // state.Employees = Aquí deberia de ir el thuk cn el meotodo eliminar
    },
  },
});

export const { DeleteEmp } = EmployeeSlice.actions;
export const employeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction; //unknown