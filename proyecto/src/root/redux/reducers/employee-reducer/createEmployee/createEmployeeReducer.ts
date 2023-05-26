import { DeleteEmployeeType, EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface CreateEmployeeState {
    createEmployee: EmployeesType
  }

  export const initialState: CreateEmployeeState = {
    createEmployee: {} as EmployeesType
  };


  type EmployeeAction = {
    type: string;
    login?: CreateEmployeeState;
  };

  export const CreateEmployeeSlice = createSlice({
    name: "createEmployee",
    initialState: initialState,

    reducers: {

        createEmployeeReducer: (state, action: PayloadAction<EmployeesType>) =>{
        return {createEmployee: action.payload}
      },
    },
  });

  export const {createEmployeeReducer} = CreateEmployeeSlice.actions;
  export const CreateEmployeeReducer = CreateEmployeeSlice.reducer;
  export type DispatchTypeCreate = (args: EmployeeAction) => EmployeeAction;