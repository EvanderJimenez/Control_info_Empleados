import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetByVariableState {
    getByVariable: EmployeesType []
  }

  export const initialStateByVariable: GetByVariableState = {
    getByVariable:[]

};

  type EmployeeAction = {
    type: string;
    getByVariable?: GetByVariableState;
  };

  export const GetByVariableSlice = createSlice({
    name: "getByVariable",
    initialState: initialStateByVariable,

    reducers: {

        getByVariableReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
        return {getByVariable: action.payload}
      },
    },
  });

  export const {getByVariableReducer} = GetByVariableSlice.actions;
  export const GetByVariableReducer = GetByVariableSlice.reducer;
  export type DispatchTypeByVariable = (args: EmployeeAction) => EmployeeAction;