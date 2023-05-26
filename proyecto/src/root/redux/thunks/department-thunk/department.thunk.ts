import { getAllDepartmentProvider, getDepartmentByIdProvider } from "./../../provider/department-provider/department.provider";
import {
  getDepartmentByIdReducer,
  DispatchType,
  getAllDepartmentReducer,
} from "../../reducers/department-reducer/DepartmentReducer";

export const startGetDepartmentById = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    const response = await getDepartmentByIdProvider(searchTerm);

    dispatch(getDepartmentByIdReducer(response || null));
  };
};

export const startGetAllDepartment = (): any => {
  return async (dispatch: DispatchType) => {
    const response = await getAllDepartmentProvider();

    dispatch(getAllDepartmentReducer(response || null));
  };
};
