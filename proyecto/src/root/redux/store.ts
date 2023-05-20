import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EmployeeReducer } from "./reducers/employee-reducer/EmployeeReducer";
import { DepartmentReducer } from './reducers/department-reducer/DepartmentReducer';

import  storage  from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

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
    //middleware: [thunk]

  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;
export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
