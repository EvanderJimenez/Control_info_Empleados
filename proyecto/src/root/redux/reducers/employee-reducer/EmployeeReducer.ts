import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployeeType,EmployeesType} from "../../../types/Employee.type";
import { parseCookies } from 'nookies';

const cookies = parseCookies();
const loginCookie = cookies['logged'];


interface EmployeeState {
  deleteEmployee: DeleteEmployeeType | null;
  employees: EmployeesType[];
  loading: boolean,
  createEmploye: EmployeesType | null;
  updateEmployee: EmployeesType | null,
  getEmployeeByUid: EmployeesType | null
  loginUser: EmployeesType | null
  getEmployeeByCedula: EmployeesType | null
  getEmployeeByName: EmployeesType | null
}

export const initialState: EmployeeState = {
  deleteEmployee: null,
  employees: [],
  loading: false,
  createEmploye: null,
  updateEmployee: null,
  getEmployeeByUid: null,
  loginUser: loginCookie ? JSON.parse(loginCookie) : null,
  getEmployeeByCedula: null,
  getEmployeeByName: null,
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
    getEmployeeByCedulaReducer: (state, action: PayloadAction<EmployeesType>) =>{
      state.getEmployeeByCedula = action.payload
    },
    getEmployeeByNameReducer: (state, action: PayloadAction<EmployeesType>) =>{
      state.getEmployeeByName = action.payload
    },
  },
});

export const { deleteEmployeeReducer,listEmployeeReducer,createEmployeesReducer,updateEmployeeReducer,getEmployeeByUidReducer,
  getEmployeeByCedulaReducer,getEmployeeByNameReducer, setLoading,loginReducer} = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
