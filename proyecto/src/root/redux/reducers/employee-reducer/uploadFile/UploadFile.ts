import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UpdateFileEmployeeState {
    updateFileEmployee: string | null
  }

  export const initialStateUpdateFile: UpdateFileEmployeeState = {
    updateFileEmployee: null
  };

  type EmployeeUpdateFileEmployeeAction = {
    type: string;
    updateFileEmployee?: UpdateFileEmployeeState;
  };

  export const UpdateFileEmployeeSlice = createSlice({
    name: "updateFileEmployee",
    initialState: initialStateUpdateFile,

    reducers: {

        updateFileEmployeeReducer: (state, action: PayloadAction<string>) =>{
          state.updateFileEmployee = action.payload;
      },
    },
  });

  export const {updateFileEmployeeReducer} = UpdateFileEmployeeSlice.actions;
  export const UpdateFileEmployeeReducer = UpdateFileEmployeeSlice.reducer;
  export type DispatchTypeUpdateFile = (args: EmployeeUpdateFileEmployeeAction) => EmployeeUpdateFileEmployeeAction;