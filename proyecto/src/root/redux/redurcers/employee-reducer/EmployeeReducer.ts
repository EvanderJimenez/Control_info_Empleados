import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployeeType,EmployeesType} from "../../../types/Employee.type";


interface EmployeeState {
  deleteEmployee: DeleteEmployeeType | null;
  employees: EmployeesType[];
  createEmploye: EmployeesType | null;
  updateEmployee: EmployeesType | null,
  getEmployeeByUid: EmployeesType | null
}

export const initialState: EmployeeState = {
  deleteEmployee: null,
  employees: [],
  createEmploye: null,
  updateEmployee: null,
  getEmployeeByUid: null,
};

type EmployeeAction = {
  type: string;
  employee?: EmployeeState;
};


export const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,

  reducers: {
    deleteEmployeeReducer: (state, action: PayloadAction<DeleteEmployeeType>) => {
      state.deleteEmployee = action.payload
    },
    listEmployeeReducer: (state,action: PayloadAction<EmployeesType[]>) => {
      state.employees = action.payload 
    },
    createEmployeesReducer: (state, action: PayloadAction<EmployeesType>) => {
      state.createEmploye = action.payload
    },
    updateEmployeeReducer: (state, action: PayloadAction<EmployeesType>) => {
      state.updateEmployee = action.payload
    },
    getEmployeeByUidReducer: (state, action: PayloadAction<EmployeesType>) =>{
      state.getEmployeeByUid = action.payload
    }
  },
});

export const { deleteEmployeeReducer,listEmployeeReducer,createEmployeesReducer,updateEmployeeReducer,getEmployeeByUidReducer } = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
