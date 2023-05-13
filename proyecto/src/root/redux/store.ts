import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EmployeeReducer } from "./redurcers/emp-reducer/EmpReducer";

export const ApplicationStore = configureStore({
  reducer: {
    generalStore: EmployeeReducer,
  },
});

export type RootState = ReturnType<typeof ApplicationStore.getState>;
export default ApplicationStore;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
