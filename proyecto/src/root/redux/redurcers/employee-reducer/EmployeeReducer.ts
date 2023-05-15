import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployee,ListEmployees} from "../../../types/Employee.type";



interface EmployeeState {
  deleteEmployee: DeleteEmployee | null;
  employees: ListEmployees[];
}

export const initialState: EmployeeState = {
  deleteEmployee: null,
  employees: [],
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
      state.deleteEmployee = action.payload
    },
    listEmp: (state,action: PayloadAction<ListEmployees[]>) => {
      state.employees = action.payload 
    },
    UpdateEmp: (state, action: PayloadAction<any>) => {},
  },
});

export const { deleteEmp,listEmp } = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
