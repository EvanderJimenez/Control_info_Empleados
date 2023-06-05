
import { Brands } from "@/root/interface/employee/employee.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UpdateBrandsState {
    UpdateBrands: Brands
  }

  export const initialStateBransUpdate: UpdateBrandsState = {
    UpdateBrands: {} as Brands
  };


  type BrandsUpdateAction = {
    type: string;
    UpdateBrands?: UpdateBrandsState;
  };

  export const UpdateBrandsSlice = createSlice({
    name: "UpdateBrands",
    initialState: initialStateBransUpdate,

    reducers: {

        updateBrandsReducer: (state, action: PayloadAction<Brands>) =>{
        return {UpdateBrands: action.payload}
      },
    },
  });

  export const {updateBrandsReducer} = UpdateBrandsSlice.actions;
  export const UpdateBrandsReducer = UpdateBrandsSlice.reducer;
  export type DispatchTypeUpdateBrands = (args: BrandsUpdateAction) => BrandsUpdateAction;