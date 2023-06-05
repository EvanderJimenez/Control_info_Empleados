import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface getByVariableAdminState {
  getByVariableAdmin: EmployeesType[];
}

export const initialStateByVariableAdmin: getByVariableAdminState = {
  getByVariableAdmin: [],
};

type EmployeeByVariableAdminAction = {
  type: string;
  getByVariableAdmin?: getByVariableAdminState;
};

export const getByVariableAdminSlice = createSlice({
  name: "getByVariableAdmin",
  initialState: initialStateByVariableAdmin,

  reducers: {
    getByVariableAdminReducer: (
      state,
      action: PayloadAction<EmployeesType[]>
    ) => {
      return { getByVariableAdmin: action.payload };
    },
    resetByVariable: (state) => {
      state.getByVariableAdmin = [];
    },
  },
});

export const { getByVariableAdminReducer, resetByVariable } =
  getByVariableAdminSlice.actions;
export const GetByVariableAdminReducer = getByVariableAdminSlice.reducer;
export type DispatchTypeByVariable = (
  args: EmployeeByVariableAdminAction
) => EmployeeByVariableAdminAction;
