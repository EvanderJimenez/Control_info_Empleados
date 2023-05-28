import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetByVariableState {
    getByVariable: EmployeesType []
  }

  export const initialStateByVariable: GetByVariableState = {
    getByVariable:[]

};

  type EmployeeByVariableAction = {
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
      resetByVariable: (state) => {
        state.getByVariable = [];
      },
    },
  });

  export const {getByVariableReducer,resetByVariable } = GetByVariableSlice.actions;
  export const GetByVariableReducer = GetByVariableSlice.reducer;
  export type DispatchTypeByVariable = (args: EmployeeByVariableAction) => EmployeeByVariableAction;