import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface CreateDepartmentState {
    createDepartment: DepartmentType
  }

  export const initialStateDepartCreate: CreateDepartmentState = {
    createDepartment: {} as DepartmentType
  };


  type DepartmentCreateAction = {
    type: string;
    createDepartment?: CreateDepartmentState;
  };

  export const CreateDepartmentSlice = createSlice({
    name: "createDepartment",
    initialState: initialStateDepartCreate,

    reducers: {

        createDepartmentReducer: (state, action: PayloadAction<DepartmentType>) =>{
        return {createDepartment: action.payload}
      },
    },
  });

  export const {createDepartmentReducer} = CreateDepartmentSlice.actions;
  export const CreateDepartmentReducer = CreateDepartmentSlice.reducer;
  export type DispatchTypeCreateDepartment = (args: DepartmentCreateAction) => DepartmentCreateAction;