import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetEmployeeByUidState {
  getEmployeeByUid: EmployeesType | null;
  getEmployeeByUid2: EmployeesType | null;
  getEmployeeByUid3: EmployeesType | null;
}

export const initialStateByUid: GetEmployeeByUidState = {
  getEmployeeByUid: initialDataEmployee,
  getEmployeeByUid2: initialDataEmployee,
  getEmployeeByUid3: initialDataEmployee,
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
    getEmployeeByUid2Reducer: (state, action: PayloadAction<EmployeesType>) => {
      state.getEmployeeByUid2 = action.payload;
    },
    resetEmployeeByUid2: (state) => {
      state.getEmployeeByUid2 = initialStateByUid.getEmployeeByUid2;
    },
    getEmployeeByUid3Reducer: (state, action: PayloadAction<EmployeesType>) => {
      state.getEmployeeByUid3 = action.payload;
    },
    resetEmployeeByUid3: (state) => {
      state.getEmployeeByUid3 = initialStateByUid.getEmployeeByUid3;
    },
  },
});

export const {
  getEmployeeByUidReducer,
  resetEmployeeByUid,
  getEmployeeByUid2Reducer,
  resetEmployeeByUid2,
  getEmployeeByUid3Reducer,
  resetEmployeeByUid3,
} = GetEmployeeByUidSlice.actions;

export const GetEmployeeByUidReducer = GetEmployeeByUidSlice.reducer;

export type DispatchTypeEmployeeByUid = (
  args: EmployeeByUidAction
) => EmployeeByUidAction;
