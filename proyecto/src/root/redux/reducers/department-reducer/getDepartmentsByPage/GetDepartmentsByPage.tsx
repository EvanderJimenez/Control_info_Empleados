import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";

interface GetDepartmentByIdDepartmentsState {
  getDepartmentByIdEmployee: DepartmentType;
}

export const initialStateDepartGetByIdEmployee: GetDepartmentByIdDepartmentsState =
  {
    getDepartmentByIdEmployee: {} as DepartmentType,
  };

type DepartmentActionGetByIdEmployee = {
  type: string;
  getDepartmentByIdEmployee?: DepartmentType;
  pageSize?: number;
  page?: number;
};

export const getByIdEmployeeDepartmentSlice = createSlice({
  name: "getDepartmentByIdEmployee",
  initialState: initialStateDepartGetByIdEmployee,

  reducers: {
    getDepartmentByIdEmployeeReducer: (
      state,
      action: PayloadAction<DepartmentActionGetByIdEmployee>
    ) => {
      const { pageSize, page } = action.payload;
      return {
        ...state,
        getDepartmentByIdEmployee: {
          ...state.getDepartmentByIdEmployee,
        },
        pageSize,
        page,
      };
    },
  },
});

export const { getDepartmentByIdEmployeeReducer } =
  getByIdEmployeeDepartmentSlice.actions;

export const GetByIdEmployeeDepartmentsReducer =
  getByIdEmployeeDepartmentSlice.reducer;

export type DispatchTypeGetByIdEmployee = (
  args: DepartmentActionGetByIdEmployee
) => DepartmentActionGetByIdEmployee;
