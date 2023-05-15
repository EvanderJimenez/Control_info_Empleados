import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployee} from "../../../types/Employee.type";


interface EmployeeState {
  deleteEmployee: DeleteEmployee | null;
}

export const initialState: EmployeeState = {
  deleteEmployee: null,
};

type EmployeeAction = {
  type: string;
  delete?: EmployeeState;
};


export const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,

  reducers: {
    DeleteEmp: (state, action: PayloadAction<DeleteEmployee>) => {
      return  {...state,deleteEmployee:action.payload}
      //state.deleteEmployee = action.payload; //we add the deleted employee in the state.deleteEmployee with the payload function
    },
    UpdateEmp: (state, action: PayloadAction<any>) => {},
  },
});

export const { DeleteEmp } = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
