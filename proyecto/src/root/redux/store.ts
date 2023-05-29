import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { LoadReducer } from "./reducers/loading-reducer/LoadingReducer";

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
import { IDreducer } from "./reducers/department-reducer/Idreducer/IDreducer";
import { CreateEmployeeReducer } from "./reducers/employee-reducer/createEmployee/CreateEmployeeReducer";
import { DeleteEmployeesReducer } from "./reducers/employee-reducer/deleteEmployee/DeleteEmployeeReducer";
import { DismissEmployeesReducer } from "./reducers/employee-reducer/dismissEmployee/DismissEmployeeReducer";
import { GetAllBossReducer } from "./reducers/employee-reducer/getAllBosses/GetAllBossesReducer";
import { GetByVariableReducer } from "./reducers/employee-reducer/getByVariable/GetByVariableReducer";
import { GetEmployeesByIdDepartmentReducer } from "./reducers/employee-reducer/getEmployeesByIdDepartment/GetEmployeesByIdDepartmentReducer";
import { VacationsReducer } from "./reducers/employee-reducer/getVacationsByUid/GetVacationsByUidReducers";
import { ListEmployeesReducer } from "./reducers/employee-reducer/listEmployees/ListEmployeeReducer";
import { UpdateEmployeeReducer } from "./reducers/employee-reducer/updateEmployee/UpdateEmployeeReducer";

export const ApplicationStore = configureStore({
  reducer: {
    deleteEmployeeStore: DeleteEmployeesReducer,
    dismissEmployeeStore: DismissEmployeesReducer,
    employeesListStore: ListEmployeesReducer,
    createEmployeeStore: CreateEmployeeReducer,
    updateEmployeeStore: UpdateEmployeeReducer,
    loading: LoadReducer,
    getEmployeeByUidStore: GetEmployeeByUidReducer,
    loginStore: LoginReducer,
    getByVariableStore: GetByVariableReducer,
    getVacationsByUidStore: VacationsReducer,
    getAllBossesStore: GetAllBossReducer,
    getEmployeesByIdDepartmentStore: GetEmployeesByIdDepartmentReducer,

    getAllDepartmentStore: GetAllDepartmentsReducer,
    getDepartmentByIdStore: GetByIdEmployeeDepartmentsReducer,
    getDepartmentByIdDocStore: ByIdDocReducer,
    getIDStore: IDreducer,
    getAllBrans: GetAllBrandsReducer,
    createBrands: CreateBrandsReducer,
    getBrandsByDocId: GetBrandsByDocIdReducer,
    updateBrands: UpdateBrandsReducer,
    GetBrandsByIdEmployee: GetBrandsByIdEmployeeReducer,
  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;

export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
