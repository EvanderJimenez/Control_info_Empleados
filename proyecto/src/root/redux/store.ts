import { LoginReducer } from './reducers/login-reducer/loginReducer';
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { DepartmentReducer } from "./reducers/department-reducer/DepartmentReducer";
import { LoadReducer } from "./reducers/loading-reducer/LoadingReducer";
import { VacationsReducer } from "./reducers/employee-reducer/getVacationsByUid/getVacationsByUidReducers";
import { DeleteEmployeesReducer } from "./reducers/employee-reducer/deleteEmployee/deleteEmployeeReducer";
import { DismissEmployeesReducer } from "./reducers/employee-reducer/dismissEmployee/dismissEmployeeReducer";
import { CreateEmployeeReducer } from "./reducers/employee-reducer/createEmployee/createEmployeeReducer";
import { ListEmployeesReducer } from "./reducers/employee-reducer/listEmployees/listEmployeeReducer";
import { UpdateEmployeeReducer } from "./reducers/employee-reducer/updateEmployee/updateEmployeeReducer";
import { GetEmployeeByUidReducer } from './reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer';
import { GetByVariableReducer } from './reducers/employee-reducer/getByVariable/getByVariableReducer';
import { GetEmployeesByIdDepartmentReducer } from './reducers/employee-reducer/getEmployeesByIdDepartment/getEmployeesByIdDepartmentReducer';
import { GetAllBossReducer } from './reducers/employee-reducer/getAllBosses/getAllBossesReducer';

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
