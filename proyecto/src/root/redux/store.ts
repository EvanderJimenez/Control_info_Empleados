import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { DepartmentReducer } from "./reducers/department-reducer/DepartmentReducer";
import { LoadReducer } from "./reducers/loading-reducer/LoadingReducer";
import { VacationsReducer } from "./reducers/employee-reducer/getVacationsByUid/GetVacationsByUidReducers";
import { DismissEmployeesReducer } from "./reducers/employee-reducer/dismissEmployee/DismissEmployeeReducer";
import { CreateEmployeeReducer } from "./reducers/employee-reducer/createEmployee/CreateEmployeeReducer";
import { ListEmployeesReducer } from "./reducers/employee-reducer/listEmployees/ListEmployeeReducer";
import { UpdateEmployeeReducer } from "./reducers/employee-reducer/updateEmployee/UpdateEmployeeReducer";
import { GetEmployeeByUidReducer } from './reducers/employee-reducer/getEmployeeByUid/GetEmployeeByUidReducer';
import { GetByVariableReducer } from './reducers/employee-reducer/getByVariable/GetByVariableReducer';
import { GetEmployeesByIdDepartmentReducer } from './reducers/employee-reducer/getEmployeesByIdDepartment/GetEmployeesByIdDepartmentReducer';
import { GetAllBossReducer } from './reducers/employee-reducer/getAllBosses/GetAllBossesReducer';
import { DeleteEmployeesReducer } from './reducers/employee-reducer/deleteEmployee/DeleteEmployeeReducer';
import { LoginReducer } from "./reducers";

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
    getDepartmentByIdStore: DepartmentReducer,
    getVacationsByUidStore: VacationsReducer,
    getAllBossesStore: GetAllBossReducer,
    getEmployeesByIdDepartmentStore: GetEmployeesByIdDepartmentReducer,
    getAllDepartmentStore: DepartmentReducer,
  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;

export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
