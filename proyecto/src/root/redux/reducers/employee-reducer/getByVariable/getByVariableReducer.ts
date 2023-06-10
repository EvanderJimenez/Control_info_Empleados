import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetByVariableState {
    getByVariable: EmployeesType []
    getByVariable2: EmployeesType []
  }

  export const initialStateByVariable: GetByVariableState = {
    getByVariable:[],
    getByVariable2:[]

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
        return {...state,getByVariable: action.payload}
      },
      resetByVariable: (state) => {
        state.getByVariable = [];
      },
      getByVariable2Reducer: (state, action: PayloadAction<EmployeesType[]>) =>{
        return {...state, getByVariable2: action.payload}
      },
      resetByVariable2: (state) => {
        state.getByVariable2 = [];
      },
    },
  });

  export const {getByVariableReducer,resetByVariable,getByVariable2Reducer,resetByVariable2 } = GetByVariableSlice.actions;
  export const GetByVariableReducer = GetByVariableSlice.reducer;
  export type DispatchTypeByVariable = (args: EmployeeByVariableAction) => EmployeeByVariableAction;