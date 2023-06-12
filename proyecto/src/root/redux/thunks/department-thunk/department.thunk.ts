import { DispatchTypeGetByIdEmployee, getDepartmentByIdEmployeeReducer } from "../../reducers/department-reducer/getDepartmentById/GetDepartmentByIdEmployee";
import { departProvider } from "../../provider";
import { DispatchTypeGetAllDepartments, getAllDepartmentsReducer } from "../../reducers/department-reducer/getAllDepartments/GetAllDepartmentsReducer";
import { DispatchTypeByIDoc, getDepartmentByDocIdReducer, resetDepartmentByDocIdReducer } from "../../reducers/department-reducer/getDepartmentByDocId/GetDepartmentByDocIdReducer";
import { DispatchTypeUpdateDepartment, updateDepartmentByIdReducer } from "../../reducers/department-reducer/updateDepartmentById/UpdateDepartmentByIdReducer";
import { DepartmentType } from "@/root/types/Department.type";
import { DispatchTypeCreateDepartment, createDepartmentReducer } from "../../reducers/department-reducer/createDepartment/CreateDepartmentReducer";
import { DispatchID, getID } from "../../reducers/department-reducer/Idreducer/IDreducer";
import { Department } from "@/root/interface/departments";
import { DispatchTypeGetByName, getDepartmentByNameReducer, resetDepartmentByNameReducer } from "../../reducers/department-reducer/getDepartmentByName/GetDepartmentByNameReducer";
import { DispatchTypeGetByPage, getDepartmentByPageReducer, resetDepartmentByPageReducer } from "../../reducers/department-reducer/getDepartmentsByPage/GetDepartmentsByPage";

export const startGetDepartmentById = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeGetByIdEmployee) => {
    const response = await departProvider.getDepartmentByIdProvider(searchTerm);
    dispatch(getDepartmentByIdEmployeeReducer(response || null));
  };
};

export const startGetID = (ID: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchID) => {
    dispatch(getID(ID));
  };
};

export const startGetAllDepartment = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeGetAllDepartments) => {
    const response = await departProvider.getAllDepartmentProvider();

    dispatch(getAllDepartmentsReducer(response || null));
  };
};

export const startGetDepartByIdDoc = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByIDoc) => {
    const response = await departProvider.getDepartmentByDocIdProvider(searchTerm);

    dispatch(getDepartmentByDocIdReducer(response || null));
  };
};

export const StartResetDepartByIdDoc = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByIDoc) => {
    dispatch(resetDepartmentByDocIdReducer());
  };
};

export const startUpdateDepartment = (searchTerm: string, searchTerm2: Department): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeUpdateDepartment) => {
    const response = await departProvider.updateDepartmentByIdProvider(searchTerm, searchTerm2);

    dispatch(updateDepartmentByIdReducer(response || null));
  };
};

export const startCreateDepartment = (searchTerm: DepartmentType): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeCreateDepartment) => {
    const response = await departProvider.createDepartmentProvider(searchTerm);

    dispatch(createDepartmentReducer(response || null));
  };
};

export const startGetDepartmentByPage = (searchTerm: number, searchTerm2: number): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeGetByPage) => {
    const response = await departProvider.getDepartmentsByPageProvider(searchTerm,searchTerm2);
    dispatch(getDepartmentByPageReducer(response || null));
  };
};

export const StartResetDepartmentByPage = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeGetByPage) => {
    dispatch(resetDepartmentByPageReducer());
  };
};

export const startGetDepartmentByName = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeGetByName) => {
    const response = await departProvider.getDepartmentByNameProvider(searchTerm);
    dispatch(getDepartmentByNameReducer(response || null));
  };
};

export const StartResetDepartmentByName = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeGetByName) => {
    dispatch(resetDepartmentByNameReducer());
  };
};