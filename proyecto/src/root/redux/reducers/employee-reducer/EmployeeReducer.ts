import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployee, ListEmployees } from "../../../types/Employee.type";

interface EmployeeState {
  deleteEmployee: DeleteEmployee | null;
  employees: ListEmployees[];
  createEmploye: ListEmployees | null;
  updateEmployee: ListEmployees | null;
}

export const initialState: EmployeeState = {
  deleteEmployee: null,
  employees: [],
  createEmploye: null,
  updateEmployee: null,
};

type EmployeeAction = {
  type: string;
  employee?: EmployeeState;
};

export const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,

  reducers: {
    deleteEmp: (state, action: PayloadAction<DeleteEmployee>) => {
      state.deleteEmployee = action.payload;
    },
    listEmployee: (state, action: PayloadAction<ListEmployees[]>) => {
      state.employees = action.payload;
    },
    createEmployeesprov: (state, action: PayloadAction<ListEmployees>) => {
      state.createEmploye = action.payload;
    },
    updateEmplo: (state, action: PayloadAction<ListEmployees>) => {
      state.updateEmployee = action.payload;
    },
  },
});

export const { deleteEmp, listEmployee, createEmployeesprov, updateEmplo } = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
