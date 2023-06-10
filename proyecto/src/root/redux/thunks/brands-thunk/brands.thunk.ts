import { brandProvider } from "../../provider/brands-provider/brands.provider";
import {
  DispatchTypeGetAllBrands,
  getAllBrandsReducer,
} from "../../reducers/brands-reducer/getAllBrands/GetAllBrandsReducer";
import {
  DispatchTypeByIdDocBrands,
  getBrandsByDocIdReducer,
} from "../../reducers/brands-reducer/getBrandsByDocId/GetBrandsByDocIdReducer";
import {
  DispatchTypeUpdateBrands,
  updateBrandsReducer,
} from "../../reducers/brands-reducer/updateBrandsById/UpdateBrandsByIdReducer";
import {
  DispatchTypeCreateBrands,
  createBrandsReducer,
} from "../../reducers/brands-reducer/createBrands/CreateBrandsReducer";
import {
  DispatchTypeByIdEmployeeBrandsBrands,
  getBrandsByIdEmployeeReducer,
} from "../../reducers/brands-reducer/getBrandsDocByEmployeeId/GetBrandsDocByEmployeeIdReducer";
import { Brands } from "@/root/interface/employee";
import { LaborRegistration } from "@/root/interface/brands";
import { starAlertSuccess } from "../alertHandler-thunk/alertHandler-thunk";

export const startGetAllBrands = (): any => {
  return async (dispatch: DispatchTypeGetAllBrands) => {
    const response = await brandProvider.getAllBrandsProvider();

    dispatch(getAllBrandsReducer(response || null));
  };
};

export const startUpdateBrands = (
  searchTerm: string,
  searchTerm2: LaborRegistration
): any => {
  return async (dispatch: DispatchTypeUpdateBrands) => {
    const response = await brandProvider.updateBrandsByIdProvider(
      searchTerm,
      searchTerm2
    );

    if (response) {
      dispatch(starAlertSuccess("mark done correctly", true))
    } else {
      dispatch(startAlertError('There was an error updating the marks, check your schedule and credentials',true))
    }

    dispatch(updateBrandsReducer(response || null));
  };
};

export const startGetBrandsByIdDoc = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeByIdDocBrands) => {
    const response = await brandProvider.getBrandsByDocIdProvider(searchTerm);

    dispatch(getBrandsByDocIdReducer(response || null));
  };
};

export const startCreateBrands = (searchTerm: LaborRegistration): any => {
  return async (dispatch: DispatchTypeCreateBrands) => {
    const response = await brandProvider.createBrandsProvider(searchTerm);

    dispatch(createBrandsReducer(response || null));
  };
};

export const startGetBrandsByIdEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeByIdEmployeeBrandsBrands) => {
    const response = await brandProvider.getBrandsDocByEmployeeIdProvider(
      searchTerm
    );

    dispatch(getBrandsByIdEmployeeReducer(response || null));
  };
};
function startAlertError(arg0: string, arg1: boolean): { type: string; UpdateBrands?: UpdateBrandsState | undefined; } {
  throw new Error("Function not implemented.");
}

