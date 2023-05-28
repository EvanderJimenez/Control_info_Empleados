import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UpdateDepartmentByIdState {
    updateDepartmentById: DepartmentType
  }

  export const initialStateDepartUpdate: UpdateDepartmentByIdState = {
    updateDepartmentById: {} as DepartmentType
  };


  type DepartmentActionUpdate = {
    type: string;
    updateDepartmentById?: UpdateDepartmentByIdState;
  };

  export const updateDepartmentSlice = createSlice({
    name: "updateDepartmentById",
    initialState: initialStateDepartUpdate,

    reducers: {

        updateDepartmentByIdReducer: (state, action: PayloadAction<DepartmentType>) =>{
        return {updateDepartmentById: action.payload}
      },
    },
  });

  export const {updateDepartmentByIdReducer} = updateDepartmentSlice.actions;
  export const UpdateDepartmentReducer = updateDepartmentSlice.reducer;
  export type DispatchTypeUpdateDepartment = (args: DepartmentActionUpdate) => DepartmentActionUpdate;