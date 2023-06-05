import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetDepartmentByNameState {
  getDepartmentByName: DepartmentType[];
}

export const initialStateDepartGetByName: GetDepartmentByNameState = {
  getDepartmentByName: [],
};

type DepartmentActionGetByName = {
  type: string;
  getDepartmentByName?: GetDepartmentByNameState;
};

export const getByNameDepartmentSlice = createSlice({
  name: "getDepartmentByName",
  initialState: initialStateDepartGetByName,

  reducers: {
    getDepartmentByNameReducer: (
      state,
      action: PayloadAction<DepartmentType[]>
    ) => {
      return { getDepartmentByName: action.payload };
    },
    resetDepartmentByNameReducer: (state) => {
      state.getDepartmentByName =
        initialStateDepartGetByName.getDepartmentByName;
    },
  },
});

export const { getDepartmentByNameReducer, resetDepartmentByNameReducer } =
  getByNameDepartmentSlice.actions;
export const GetDepartmentByNameReducer = getByNameDepartmentSlice.reducer;
export type DispatchTypeGetByName = (
  args: DepartmentActionGetByName
) => DepartmentActionGetByName;
