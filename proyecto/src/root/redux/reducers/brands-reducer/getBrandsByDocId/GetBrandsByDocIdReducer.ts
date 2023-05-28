import { Brands } from "@/root/interface/employee";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetBrandsByDocIdBrandsState {
    getBrandsByDocId: Brands
  }

  export const initialStateByDocIdBrandSlice: GetBrandsByDocIdBrandsState = {
    getBrandsByDocId: {} as Brands
  };


  type BrandsCByIdDocAction = {
    type: string;
    getBrandsByDocId?: GetBrandsByDocIdBrandsState;
  };

  export const GetBrandsByDocIdBrandsSlice = createSlice({
    name: "getBrandsByDocId",
    initialState: initialStateByDocIdBrandSlice,

    reducers: {

        getBrandsByDocIdReducer: (state, action: PayloadAction<Brands>) =>{
        return {getBrandsByDocId: action.payload}
      },
    },
  });

  export const {getBrandsByDocIdReducer} = GetBrandsByDocIdBrandsSlice.actions;
  export const GetBrandsByDocIdReducer = GetBrandsByDocIdBrandsSlice.reducer;
  export type DispatchTypeByIdDocBrands = (args: BrandsCByIdDocAction) => BrandsCByIdDocAction;