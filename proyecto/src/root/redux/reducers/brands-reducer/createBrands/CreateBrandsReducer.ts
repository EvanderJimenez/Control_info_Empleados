import { Brands } from "@/root/interface/employee";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface CreateBrandsState {
    createBrands: Brands
  }

  export const initialStateBransCreate: CreateBrandsState = {
    createBrands: {} as Brands
  };


  type BrandsCreateAction = {
    type: string;
    createBrands?: CreateBrandsState;
  };

  export const CreateBrandsSlice = createSlice({
    name: "createBrands",
    initialState: initialStateBransCreate,

    reducers: {

        createBrandsReducer: (state, action: PayloadAction<Brands>) =>{
        return {createBrands: action.payload}
      },
    },
  });

  export const {createBrandsReducer} = CreateBrandsSlice.actions;
  export const CreateBrandsReducer = CreateBrandsSlice.reducer;
  export type DispatchTypeCreateBrands = (args: BrandsCreateAction) => BrandsCreateAction;