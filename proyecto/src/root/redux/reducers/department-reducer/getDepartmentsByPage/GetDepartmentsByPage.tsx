import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";

interface GetDepartmentByPagesState {
  getDepartmentByPage: DepartmentType[];
}

export const initialStateDepartGetByPage: GetDepartmentByPagesState =
  {
    getDepartmentByPage: [],
  };

type DepartmentActionGetByPage = {
  type: string;
  getDepartmentByPage?: DepartmentType;
  pageSize?: number;
  page?: number;
};

export const getByPageDepartmentSlice = createSlice({
  name: "getDepartmentByPage",
  initialState: initialStateDepartGetByPage,

  reducers: {

    getDepartmentByPageReducer: (state, action: PayloadAction<DepartmentType[]>) =>{
    return {getDepartmentByPage: action.payload}
  },
  resetDepartmentByPageReducer: (state) => {
    state.getDepartmentByPage = initialStateDepartGetByPage.getDepartmentByPage;
  },

},
});

export const { getDepartmentByPageReducer , resetDepartmentByPageReducer} = getByPageDepartmentSlice.actions;

export const GetByPageDepartmentsReducer = getByPageDepartmentSlice.reducer;

export type DispatchTypeGetByPage = (args: DepartmentActionGetByPage) => DepartmentActionGetByPage;
