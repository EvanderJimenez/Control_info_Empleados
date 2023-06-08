import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { LoadReducer } from "./reducers/loading-reducer/LoadingReducer";
import { VacationsReducer } from "./reducers/employee-reducer/getVacationsByUid/GetVacationsByUidReducers";
import { DismissEmployeesReducer } from "./reducers/employee-reducer/dismissEmployee/DismissEmployeeReducer";
import { CreateEmployeeReducer } from "./reducers/employee-reducer/createEmployee/CreateEmployeeReducer";
import { ListEmployeesReducer } from "./reducers/employee-reducer/listEmployees/ListEmployeeReducer";
import { UpdateEmployeeReducer } from "./reducers/employee-reducer/updateEmployee/UpdateEmployeeReducer";
import { GetByVariableReducer } from "./reducers/employee-reducer/getByVariable/GetByVariableReducer";
import { GetAllBossReducer } from "./reducers/employee-reducer/getAllBosses/GetAllBossesReducer";
import { DeleteEmployeesReducer } from "./reducers/employee-reducer/deleteEmployee/DeleteEmployeeReducer";
import { GetAllDepartmentsReducer } from "./reducers/department-reducer/getAllDepartments/GetAllDepartmentsReducer";
import { GetByIdEmployeeDepartmentsReducer } from "./reducers/department-reducer/getDepartmentById/GetDepartmentByIdEmployee";
import { ByIdDocReducer } from "./reducers/department-reducer/getDepartmentByDocId/GetDepartmentByDocIdReducer";
import { GetAllBrandsReducer } from "./reducers/brands-reducer/getAllBrands/GetAllBrandsReducer";
import { CreateBrandsReducer } from "./reducers/brands-reducer/createBrands/CreateBrandsReducer";
import { GetBrandsByDocIdReducer } from "./reducers/brands-reducer/getBrandsByDocId/GetBrandsByDocIdReducer";
import { UpdateBrandsReducer } from "./reducers/brands-reducer/updateBrandsById/UpdateBrandsByIdReducer";
import { GetBrandsByIdEmployeeReducer } from "./reducers/brands-reducer/getBrandsDocByEmployeeId/GetBrandsDocByEmployeeIdReducer";
import { LoginReducer } from "./reducers/login-reducer/loginReducer";

import { GetEmployeeByUidReducer } from "./reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer";
import { GetByVariableAdminReducer } from "./reducers/employee-reducer/getByVariableAdmin/getByVariableAdminReducer";
import { UpdateFileEmployeeReducer } from "./reducers/employee-reducer/uploadFile/UploadFile";
import { GetFileURLByNameReducer } from "./reducers/employee-reducer/getFileURLByName/GetFileURLByNameReducer";
import { GetDepartmentByNameReducer } from "./reducers/department-reducer/getDepartmentByName/GetDepartmentByNameReducer";
import { GetByPageDepartmentsReducer } from "./reducers/department-reducer/getDepartmentsByPage/GetDepartmentsByPage";
import { AlertReducer } from "./reducers/alertHandler-reducer/AlertHandlerReducer";
import { GetEmployeesByIdDepartmentReducerReducer } from "./reducers/employee-reducer/getEmployeesByIdDepartment/GetEmployeesByIdDepartmentReducer";

export const ApplicationStore = configureStore({
  reducer: {
    alertStore: AlertReducer,
    deleteEmployeeStore: DeleteEmployeesReducer,
    dismissEmployeeStore: DismissEmployeesReducer,
    employeesListStore: ListEmployeesReducer,
    createEmployeeStore: CreateEmployeeReducer,
    updateEmployeeStore: UpdateEmployeeReducer,
    loading: LoadReducer,
    getEmployeeByUidStore: GetEmployeeByUidReducer,
    loginStore: LoginReducer,
    getByVariableStore: GetByVariableReducer,
    getByVariableAdminStore: GetByVariableAdminReducer,
    getVacationsByUidStore: VacationsReducer,
    getAllBossesStore: GetAllBossReducer,
    getEmployeesByIdDepartmentStore: GetEmployeesByIdDepartmentReducerReducer,
    getEmployeesByIdDepartmentJustificationsStore: GetEmployeesByIdDepartmentReducerReducer,
    uploadFile: UpdateFileEmployeeReducer,

    getAllDepartmentStore: GetAllDepartmentsReducer,
    getDepartmentByIdStore: GetByIdEmployeeDepartmentsReducer,
    getDepartmentByIdDocStore: ByIdDocReducer,
    getDepartmentByPage:GetByPageDepartmentsReducer,
    getDepartmentByName:GetDepartmentByNameReducer,

    getAllBrans: GetAllBrandsReducer,
    createBrands: CreateBrandsReducer,
    getBrandsByDocId: GetBrandsByDocIdReducer,
    updateBrands: UpdateBrandsReducer,
    GetBrandsByIdEmployee: GetBrandsByIdEmployeeReducer,
    GetFileURLByNameStore: GetFileURLByNameReducer,
  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;

export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
