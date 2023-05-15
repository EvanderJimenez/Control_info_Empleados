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
  delete?: EmployeeState;
};


export const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,

  reducers: {
    deleteEmp: (state, action: PayloadAction<DeleteEmployee>) => {
      return  {...state,deleteEmployee:action.payload}
      //state.deleteEmployee = action.payload; //we add the deleted employee in the state.deleteEmployee with the payload function
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
