import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetFileURLByNameState {
    getFileURLByName: string  ;
}

export const initialStateByUid: GetFileURLByNameState = {
    getFileURLByName: ""
};

type EmployeeByUidAction = {
  type: string;
  getFileURLByName?: GetFileURLByNameState;
};

export const GetEmployeeByUidSlice = createSlice({
  name: "getFileURLByName",
  initialState: initialStateByUid,

  reducers: {
    getFileURLByNameReducer: (state, action: PayloadAction<string>) => {
      return { getFileURLByName: action.payload };
    },
 
  },
});

export const { getFileURLByNameReducer,   } = GetEmployeeByUidSlice.actions;
export const GetFileURLByNameReducer = GetEmployeeByUidSlice.reducer;
export type DispatchTypeGetFileURLByName = (args: EmployeeByUidAction) => EmployeeByUidAction;
