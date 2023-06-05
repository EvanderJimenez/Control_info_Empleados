import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetDepartmentByIdDepartmentsState {
    getDepartmentByIdEmployee: DepartmentType
  }

  export const initialStateDepartGetByIdEmployee: GetDepartmentByIdDepartmentsState = {
    getDepartmentByIdEmployee: {} as DepartmentType
  };


  type DepartmentActionGetByIdEmployee = {
    type: string;
    getDepartmentByIdEmployee?: GetDepartmentByIdDepartmentsState;
  };

  export const getByIdEmployeeDepartmentSlice = createSlice({
    name: "getDepartmentByIdEmployee",
    initialState: initialStateDepartGetByIdEmployee,

    reducers: {

        getDepartmentByIdEmployeeReducer: (state, action: PayloadAction<DepartmentType>) =>{
        return {getDepartmentByIdEmployee: action.payload}
      },
      resetDepartmentIdEmployeeReducer: (state) => {
        state.getDepartmentByIdEmployee = initialStateDepartGetByIdEmployee.getDepartmentByIdEmployee;
      },


    },
  });

  export const {getDepartmentByIdEmployeeReducer,resetDepartmentIdEmployeeReducer} = getByIdEmployeeDepartmentSlice.actions;
  export const GetByIdEmployeeDepartmentsReducer = getByIdEmployeeDepartmentSlice.reducer;
  export type DispatchTypeGetByIdEmployee = (args: DepartmentActionGetByIdEmployee) => DepartmentActionGetByIdEmployee;