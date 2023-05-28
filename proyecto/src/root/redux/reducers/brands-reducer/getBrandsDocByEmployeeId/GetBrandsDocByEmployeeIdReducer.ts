import { Brands } from "@/root/interface/employee";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface BrandsByIdEmployeeState {
    getBrandsByIdEmployee: Brands
  }

  export const initialStateByIdEmployeeBrandSlice: BrandsByIdEmployeeState = {
    getBrandsByIdEmployee: {} as Brands
  };


  type BrandsCByIdEmployeeAction = {
    type: string;
    getBrandsByIdEmployee?: BrandsByIdEmployeeState;
  };

  export const GetBrandsByIdEmployeeBrandsSlice = createSlice({
    name: "getBrandsByIdEmployee",
    initialState: initialStateByIdEmployeeBrandSlice,

    reducers: {

        getBrandsByIdEmployeeReducer: (state, action: PayloadAction<Brands>) =>{
        return {getBrandsByIdEmployee: action.payload}
      },
    },
  });

  export const {getBrandsByIdEmployeeReducer} = GetBrandsByIdEmployeeBrandsSlice.actions;
  export const GetBrandsByIdEmployeeReducer = GetBrandsByIdEmployeeBrandsSlice.reducer;
  export type DispatchTypeByIdEmployeeBrandsBrands = (args: BrandsCByIdEmployeeAction) => BrandsCByIdEmployeeAction;