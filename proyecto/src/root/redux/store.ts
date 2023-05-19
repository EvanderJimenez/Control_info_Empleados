import { getDepartmentByIdProvider } from './provider/department-provider/department.provider';
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EmployeeReducer, setLoading } from "./reducers/employee-reducer/EmployeeReducer";
import { DepartmentReducer } from './reducers/department-reducer/DepartmentReducer';

export const ApplicationStore = configureStore({
  reducer: {
    deleteEmployeeStore: EmployeeReducer,
    employeesListStore: EmployeeReducer,
    createEmployeeStore: EmployeeReducer,
    updateEmployeeStore: EmployeeReducer,
    loading: EmployeeReducer,
    getEmployeeByUidStore: EmployeeReducer,
    getEmployeeByCedulaStore: EmployeeReducer,
    getEmployeeByNameStore: EmployeeReducer,
    loginStore: EmployeeReducer,

    getDepartmentByIdStore : DepartmentReducer,

  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;
export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
