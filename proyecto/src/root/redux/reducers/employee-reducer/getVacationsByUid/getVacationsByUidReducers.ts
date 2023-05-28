import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface EmployeeVacationsState {
    getVacationsByUid: EmployeesType[]
  }

  export const initialStateVacations: EmployeeVacationsState = {
    getVacationsByUid: {} as EmployeesType [],
  };


  type EmployeeVacationsAction = {
    type: string;
    getVacationsByUid?: EmployeeVacationsState;
  };

  export const EmployeeVacationsSlice = createSlice({
    name: "getVacationsByUid",
    initialState: initialStateVacations,

    reducers: {

      getVacationsByUidReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
        return {getVacationsByUid: action.payload}
      },
    },
  });

  export const {getVacationsByUidReducer} = EmployeeVacationsSlice.actions;
  export const VacationsReducer = EmployeeVacationsSlice.reducer;
  export type DispatchTypeVacations = (args: EmployeeVacationsAction) => EmployeeVacationsAction;