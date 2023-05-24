import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployeeType,EmployeesType} from "../../../types/Employee.type";

interface EmployeeState { //employee : EmployeesType
  deleteEmployee: DeleteEmployeeType | null;
  dismissEmployee: DeleteEmployeeType | null;
  employees: EmployeesType[];
  loading: boolean;
  createEmploye: EmployeesType | null;
  updateEmployee: EmployeesType | null;
  getEmployeeByUid: EmployeesType | null;
  loginUser: EmployeesType | null;
  getEmployeeByCedula: EmployeesType[];
  getEmployeeByName: EmployeesType[];
  getByVariable: EmployeesType[];
}
// employee {} as type

export const initialState: EmployeeState = {
  deleteEmployee: null,
  dismissEmployee: null,
  employees: [],
  loading: false, 
  createEmploye: null,
  updateEmployee: null,
  getEmployeeByUid: null,
  loginUser: null,
  getEmployeeByCedula: [],
  getEmployeeByName: [],
  getByVariable: [],
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
    dismissEmployeeReducer: (state, action: PayloadAction<DeleteEmployeeType>) => {
      state.dismissEmployee = action.payload
    },
    listEmployeeReducer: (state,action: PayloadAction<EmployeesType[]>) => {
      state.employees = action.payload 
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    createEmployeesReducer: (state, action: PayloadAction<EmployeesType>) => {
      state.createEmploye = action.payload
    },
    updateEmployeeReducer: (state, action: PayloadAction<EmployeesType>) => {
      state.updateEmployee = action.payload
    },
    getEmployeeByUidReducer: (state, action: PayloadAction<EmployeesType>) =>{
      state.getEmployeeByUid = action.payload
    },
    loginReducer: (state,action: PayloadAction<EmployeesType>) => {
      state.loginUser = action.payload
    },
    getEmployeeByCedulaReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
      state.getEmployeeByCedula = action.payload
    },
    getEmployeeByNameReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
      state.getEmployeeByName = action.payload
    },
    getByVariableReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
      state.getByVariable = action.payload
    },
  },
});

export const { deleteEmployeeReducer,listEmployeeReducer,createEmployeesReducer,updateEmployeeReducer,getEmployeeByUidReducer,
  getEmployeeByCedulaReducer,getEmployeeByNameReducer, setLoading,loginReducer, getByVariableReducer, dismissEmployeeReducer} = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
