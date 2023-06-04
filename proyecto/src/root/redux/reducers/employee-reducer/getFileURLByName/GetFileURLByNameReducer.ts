import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetFileURLByNameState {
    getFileURLByName: string  ;
}

export const initialFileURLByName: GetFileURLByNameState = {
    getFileURLByName: ""
};

type EmployeeFileURLByNameAction = {
  type: string;
  getFileURLByName?: GetFileURLByNameState;
};

export const GetEmployeeFileURLByNameSlice = createSlice({
  name: "getFileURLByName",
  initialState: initialFileURLByName,

  reducers: {
    getFileURLByNameReducer: (state, action: PayloadAction<string>) => {
      return { getFileURLByName: action.payload };
    },
    resetUrlReducer: (state) => {
      state.getFileURLByName = initialFileURLByName.getFileURLByName;
    },
 
  },
});

export const { getFileURLByNameReducer, resetUrlReducer  } = GetEmployeeFileURLByNameSlice.actions;
export const GetFileURLByNameReducer = GetEmployeeFileURLByNameSlice.reducer;
export type DispatchTypeGetFileURLByName = (args: EmployeeFileURLByNameAction) => EmployeeFileURLByNameAction;
