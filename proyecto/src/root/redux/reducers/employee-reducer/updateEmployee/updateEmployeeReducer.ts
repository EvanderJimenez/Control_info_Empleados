import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UpdateEmployeeState {
    updateEmployee: EmployeesType
  }

  export const initialStateUpdate: UpdateEmployeeState = {
    updateEmployee: {} as EmployeesType
  };


  type EmployeeUpdateAction = {
    type: string;
    getVacationsByUid?: UpdateEmployeeState;
  };

  export const UpdateEmployeeSlice = createSlice({
    name: "updateEmployee",
    initialState: initialStateUpdate,

    reducers: {

        updateEmployeeReducer: (state, action: PayloadAction<EmployeesType>) =>{
        return {updateEmployee: action.payload}
      },
    },
  });

  export const {updateEmployeeReducer} = UpdateEmployeeSlice.actions;
  export const UpdateEmployeeReducer = UpdateEmployeeSlice.reducer;
  export type DispatchTypeUpdate = (args: EmployeeUpdateAction) => EmployeeUpdateAction;