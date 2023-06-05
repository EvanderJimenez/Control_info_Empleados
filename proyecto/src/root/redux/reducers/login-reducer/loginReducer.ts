import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface LoginState {
    login: EmployeesType
  }

  export const initialStateLogin: LoginState = {
    login: {} as EmployeesType
  };


  type EmployeeAction = {
    type: string;
    login?: LoginState;
  };

  export const LoginSlice = createSlice({
    name: "login",
    initialState: initialStateLogin,

    reducers: {

        loginReducer: (state, action: PayloadAction<EmployeesType>) =>{
        return {login: action.payload}
      },
      logOut: (state) => {
        return initialStateLogin;
    },
    },
  });

  export const {loginReducer,logOut} = LoginSlice.actions;
  export const LoginReducer = LoginSlice.reducer;
  export type DispatchTypeLogin = (args: EmployeeAction) => EmployeeAction;