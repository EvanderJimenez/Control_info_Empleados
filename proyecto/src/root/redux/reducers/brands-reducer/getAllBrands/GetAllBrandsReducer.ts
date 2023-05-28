import { Brands } from "@/root/interface/employee";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetAllBrandsState {
    getAllBrands: Brands[]
  }

  export const initialStateBransGetAll: GetAllBrandsState = {
    getAllBrands: {} as Brands[]
  };


  type BrandsGetAllAction = {
    type: string;
    getAllBrands?: GetAllBrandsState;
  };

  export const GetAllBrandsSlice = createSlice({
    name: "getAllBrands",
    initialState: initialStateBransGetAll,

    reducers: {

      getAllBrandsReducer: (state, action: PayloadAction<Brands[]>) =>{
        return {getAllBrands: action.payload}
      },
    },
  });

  export const {getAllBrandsReducer} = GetAllBrandsSlice.actions;
  export const GetAllBrandsReducer = GetAllBrandsSlice.reducer;
  export type DispatchTypeGetAllBrands = (args: BrandsGetAllAction) => BrandsGetAllAction;