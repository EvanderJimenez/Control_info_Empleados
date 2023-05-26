import { DeleteEmployeeType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface EmployeeDismissState {
    dismissEmployee: DeleteEmployeeType
  }

  export const initialState: EmployeeDismissState = {
    dismissEmployee: {
        id: ""
    }
  };


  type EmployeeAction = {
    type: string;
    getVacationsByUid?: EmployeeDismissState;
  };

  export const EmployeeDismissSlice = createSlice({
    name: "dismissEmployee",
    initialState: initialState,

    reducers: {

        dismissEmployeeReducer: (state, action: PayloadAction<DeleteEmployeeType>) =>{
        return {dismissEmployee: action.payload}
      },
    },
  });

  export const {dismissEmployeeReducer} = EmployeeDismissSlice.actions;
  export const DismissEmployeesReducer = EmployeeDismissSlice.reducer;
  export type DispatchTypeDismiss = (args: EmployeeAction) => EmployeeAction;