import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EmployeeReducer } from "./reducers/employee-reducer/EmployeeReducer";
import { DepartmentReducer } from "./reducers/department-reducer/DepartmentReducer";
import { LoadReducer } from "./reducers/loading-reducer/LoadingReducer";
import { VacationsReducer } from "./reducers/employee-reducer/getVacationsByUid/getVacationsByUidReducers";

export const ApplicationStore = configureStore({
  reducer: {
    deleteEmployeeStore: EmployeeReducer,
    dismissEmployeeStore: EmployeeReducer,
    employeesListStore: EmployeeReducer,
    createEmployeeStore: EmployeeReducer,
    updateEmployeeStore: EmployeeReducer,
    loading: LoadReducer,
    getEmployeeByUidStore: EmployeeReducer,
    getEmployeeByCedulaStore: EmployeeReducer,
    getEmployeeByNameStore: EmployeeReducer,
    loginStore: EmployeeReducer,
    getByVariableStore: EmployeeReducer,
    getDepartmentByIdStore: DepartmentReducer,
    getVacationsByUidStore: VacationsReducer,
    getAllBossesStore: EmployeeReducer,
    getEmployeesByIdDepartmentStore: EmployeeReducer,
    getAllDepartmentStore: DepartmentReducer,
  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;

export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
