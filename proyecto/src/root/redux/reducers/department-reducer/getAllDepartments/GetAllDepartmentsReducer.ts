import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetAllDepartmentsState {
    getAllDepartments: DepartmentType[]
  }

  export const initialStateDepartGetAll: GetAllDepartmentsState = {
    getAllDepartments: []
  };


  type DepartmentActionGetAll = {
    type: string;
    getAllDepartments?: GetAllDepartmentsState;
  };

  export const getAllDepartmentSlice = createSlice({
    name: "getAllDepartments",
    initialState: initialStateDepartGetAll,

    reducers: {

        getAllDepartmentsReducer: (state, action: PayloadAction<DepartmentType[]>) =>{
        return {getAllDepartments: action.payload}
      },
    },
  });

  export const {getAllDepartmentsReducer} = getAllDepartmentSlice.actions;
  export const GetAllDepartmentsReducer = getAllDepartmentSlice.reducer;
  export type DispatchTypeGetAllDepartments = (args: DepartmentActionGetAll) => DepartmentActionGetAll;