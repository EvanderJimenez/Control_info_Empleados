

import { LaborRegistration } from "@/root/interface/brands";
import { Brands } from "@/root/interface/employee";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BrandsByIdEmployeeState {
  getBrandsByIdEmployee: LaborRegistration;
}

export const initialStateByIdEmployeeBrandSlice: BrandsByIdEmployeeState = {
  getBrandsByIdEmployee: {} as LaborRegistration,
};

type BrandsCByIdEmployeeAction = {
  type: string;
  getBrandsByIdEmployee?: BrandsByIdEmployeeState;
};

export const GetBrandsByIdEmployeeBrandsSlice = createSlice({
  name: "getBrandsByIdEmployee",
  initialState: initialStateByIdEmployeeBrandSlice,

  reducers: {
    getBrandsByIdEmployeeReducer: (state, action: PayloadAction<LaborRegistration>) => {
      return { getBrandsByIdEmployee: action.payload };
    },
  },
});

export const { getBrandsByIdEmployeeReducer } = GetBrandsByIdEmployeeBrandsSlice.actions;
export const GetBrandsByIdEmployeeReducer = GetBrandsByIdEmployeeBrandsSlice.reducer;
export type DispatchTypeByIdEmployeeBrandsBrands = (args: BrandsCByIdEmployeeAction) => BrandsCByIdEmployeeAction;
