import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetDepartmentByDocIdeState {
    getDepartmentByDocId: DepartmentType | null
  }

  export const initialStateDepartByIdDoc: GetDepartmentByDocIdeState = {
    getDepartmentByDocId: null
  };


  type DepartmentActionByIdDoc = {
    type: string;
    getDepartmentByDocId?: GetDepartmentByDocIdeState;
  };

  export const byIdDocDepartmentSlice = createSlice({
    name: "getDepartmentByDocId",
    initialState: initialStateDepartByIdDoc,

    reducers: {

        getDepartmentByDocIdReducer: (state, action: PayloadAction<DepartmentType>) =>{
        return {getDepartmentByDocId: action.payload}
      },
      resetDepartmentByDocIdReducer: (state) =>{
        state.getDepartmentByDocId = initialStateDepartByIdDoc.getDepartmentByDocId
      },
    },
  });

  export const {getDepartmentByDocIdReducer,resetDepartmentByDocIdReducer} = byIdDocDepartmentSlice.actions;
  export const ByIdDocReducer = byIdDocDepartmentSlice.reducer;
  export type DispatchTypeByIDoc = (args: DepartmentActionByIdDoc) => DepartmentActionByIdDoc;