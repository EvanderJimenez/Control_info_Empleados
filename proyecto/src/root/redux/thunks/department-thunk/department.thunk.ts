import { getDepartmentByIdProvider } from "./../../provider/department-provider/department.provider";
import {
  getDepartmentByIdReducer,
  DispatchType,
} from "../../reducers/department-reducer/DepartmentReducer";

export const startGetDepartmentById = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    const response = await getDepartmentByIdProvider(searchTerm);

    dispatch(getDepartmentByIdReducer(response || null));
  };
};
