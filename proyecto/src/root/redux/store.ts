import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EmployeeReducer } from "./reducers/employee-reducer/EmployeeReducer";

export const ApplicationStore = configureStore({
  reducer: {
    generalStore: EmployeeReducer,
    employeesList: EmployeeReducer,
    createEmployee: EmployeeReducer,
    updateEmployee: EmployeeReducer
  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;
export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
