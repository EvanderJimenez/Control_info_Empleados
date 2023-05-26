import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface EmployeeVacationsState {
    getVacationsByUid: EmployeesType[]
  }

  export const initialState: EmployeeVacationsState = {
    getVacationsByUid: {} as EmployeesType [],
  };


  type EmployeeAction = {
    type: string;
    getVacationsByUid?: EmployeeVacationsState;
  };

  export const EmployeeSlice = createSlice({
    name: "getVacationsByUid",
    initialState: initialState,

    reducers: {

      getVacationsByUidReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
        return {getVacationsByUid: action.payload}
      },
    },
  });

  export const {getVacationsByUidReducer} = EmployeeSlice.actions;
  export const VacationsReducer = EmployeeSlice.reducer;
  export type DispatchTypeVacations = (args: EmployeeAction) => EmployeeAction;