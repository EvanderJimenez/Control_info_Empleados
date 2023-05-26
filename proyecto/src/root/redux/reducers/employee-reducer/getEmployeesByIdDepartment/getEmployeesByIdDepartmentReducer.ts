import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetEmployeesByIdDepartmentState {
    getEmployeesByIdDepartment: EmployeesType []
  }

  export const initialState: GetEmployeesByIdDepartmentState = {
    getEmployeesByIdDepartment: []
};

  type EmployeeAction = {
    type: string;
    getEmployeesByIdDepartment?: GetEmployeesByIdDepartmentState;
  };

  export const GetEmployeesByIdDepartmentSlice = createSlice({
    name: "getEmployeesByIdDepartment",
    initialState: initialState,

    reducers: {

        getEmployeesByIdDepartmentReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
        return {getEmployeesByIdDepartment: action.payload}
      },
    },
  });

  export const {getEmployeesByIdDepartmentReducer} = GetEmployeesByIdDepartmentSlice.actions;
  export const GetEmployeesByIdDepartmentReducer = GetEmployeesByIdDepartmentSlice.reducer;
  export type DispatchTypeByIdDepart = (args: EmployeeAction) => EmployeeAction;