import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface LoginState {
    login: EmployeesType | null
  }

  export const initialState: LoginState = {
    login: {} as EmployeesType
  };


  type EmployeeAction = {
    type: string;
    login?: LoginState;
  };

  export const LoginSlice = createSlice({
    name: "login",
    initialState: initialState,

    reducers: {

        loginReducer: (state, action: PayloadAction<EmployeesType>) =>{
        return {login: action.payload}
      },
    },
  });

  export const {loginReducer} = LoginSlice.actions;
  export const LoginReducer = LoginSlice.reducer;
  export type DispatchTypeLogin = (args: EmployeeAction) => EmployeeAction;