import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UpdateEmployeeState {
    updateEmployee: EmployeesType
  }

  export const initialState: UpdateEmployeeState = {
    updateEmployee: {} as EmployeesType
  };


  type EmployeeAction = {
    type: string;
    getVacationsByUid?: UpdateEmployeeState;
  };

  export const UpdateEmployeeSlice = createSlice({
    name: "updateEmployee",
    initialState: initialState,

    reducers: {

        updateEmployeeReducer: (state, action: PayloadAction<EmployeesType>) =>{
        return {updateEmployee: action.payload}
      },
    },
  });

  export const {updateEmployeeReducer} = UpdateEmployeeSlice.actions;
  export const UpdateEmployeeReducer = UpdateEmployeeSlice.reducer;
  export type DispatchTypeUpdate = (args: EmployeeAction) => EmployeeAction;