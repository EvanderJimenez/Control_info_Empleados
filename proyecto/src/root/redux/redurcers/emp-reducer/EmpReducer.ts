import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployee} from "../../../types/Employee.type";

interface EmpState {
  deleteEmployee: DeleteEmployee | null;
}

type EmployeeAction = {
  type: string;
  delete?: EmpState;
};

//We declared the initial state for the reducer
export const initialState: EmpState = {
  deleteEmployee: null,
};

export const EmployeeSlice = createSlice({
  name: "Emp",
  initialState,

  reducers: {
    DeleteEmp: (state, action: PayloadAction<DeleteEmployee>) => {
      state.deleteEmployee = action.payload; //we add the deleted employee in the state.deleteEmployee with the payload function
    },
    UpdateEmp: (state, action: PayloadAction<any>) => {},
  },
});

export const { DeleteEmp } = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
