import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetEmployeeByUidState {
  getEmployeeByUid: EmployeesType | null;
  
}

export const initialStateByUid: GetEmployeeByUidState = {
  getEmployeeByUid: initialDataEmployee
};

type EmployeeByUidAction = {
  type: string;
  getEmployeeByUid?: GetEmployeeByUidState;
};

export const GetEmployeeByUidSlice = createSlice({
  name: "getEmployeeByUid",
  initialState: initialStateByUid,

  reducers: {
    getEmployeeByUidReducer: (state, action: PayloadAction<EmployeesType>) => {
      state.getEmployeeByUid = action.payload;
    },
    
    resetEmployeeByUid: (state) => {
      state.getEmployeeByUid = initialStateByUid.getEmployeeByUid;
    },
  },
});

export const { getEmployeeByUidReducer, resetEmployeeByUid } = GetEmployeeByUidSlice.actions;
export const GetEmployeeByUidReducer = GetEmployeeByUidSlice.reducer;
export type DispatchTypeEmployeeByUid = (args: EmployeeByUidAction) => EmployeeByUidAction;
