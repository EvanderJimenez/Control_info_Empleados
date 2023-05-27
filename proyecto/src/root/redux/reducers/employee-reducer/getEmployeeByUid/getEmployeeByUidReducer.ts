import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetEmployeeByUidState {
    getEmployeeByUid: EmployeesType | null
  }

  export const initialStateByUid: GetEmployeeByUidState = {
    getEmployeeByUid: null  };


  type EmployeeAction = {
    type: string;
    getEmployeeByUid?: GetEmployeeByUidState;
  };

  export const GetEmployeeByUidSlice = createSlice({
    name: "getEmployeeByUid",
    initialState: initialStateByUid,

    reducers: {

        getEmployeeByUidReducer: (state, action: PayloadAction<EmployeesType>) =>{
        return {getEmployeeByUid: action.payload}
      },
    },
  });

  export const {getEmployeeByUidReducer} = GetEmployeeByUidSlice.actions;
  export const GetEmployeeByUidReducer = GetEmployeeByUidSlice.reducer;
  export type DispatchTypeEmployeeByUid = (args: EmployeeAction) => EmployeeAction;