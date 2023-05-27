import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface CreateEmployeeState {
    createEmployee: EmployeesType
  }

  export const initialStateCreate: CreateEmployeeState = {
    createEmployee: {} as EmployeesType
  };


  type EmployeeAction = {
    type: string;
    createEmployee?: CreateEmployeeState;
  };

  export const CreateEmployeeSlice = createSlice({
    name: "createEmployee",
    initialState: initialStateCreate,

    reducers: {

        createEmployeeReducer: (state, action: PayloadAction<EmployeesType>) =>{
        return {createEmployee: action.payload}
      },
    },
  });

  export const {createEmployeeReducer} = CreateEmployeeSlice.actions;
  export const CreateEmployeeReducer = CreateEmployeeSlice.reducer;
  export type DispatchTypeCreate = (args: EmployeeAction) => EmployeeAction;