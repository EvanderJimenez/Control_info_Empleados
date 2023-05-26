import { DeleteEmployeeType, EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ListEmployeesState {
    listEmployees: EmployeesType[]
  }

  export const initialState: ListEmployeesState = {
    listEmployees: {} as EmployeesType[]
  };


  type EmployeeAction = {
    type: string;
    getVacationsByUid?: ListEmployeesState;
  };

  export const ListEmployeeSlice = createSlice({
    name: "listEmployees",
    initialState: initialState,

    reducers: {

        listEmployeesReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
        return {listEmployees: action.payload}
      },
    },
  });

  export const {listEmployeesReducer} = ListEmployeeSlice.actions;
  export const ListEmployeesReducer = ListEmployeeSlice.reducer;
  export type DispatchTypeListEmployee = (args: EmployeeAction) => EmployeeAction;