import { EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GetEmployeesByIdDepartmentState {
  getEmployeesByIdDepartment: EmployeesType[];
  getEmployeesByIdDepartmentVacations: EmployeesType[];
  getEmployeesByIdDepartmentJustifications: EmployeesType[];
  getEmployeesByIdDepartmentPdf: EmployeesType[];
}

export const initialStateIdDepart: GetEmployeesByIdDepartmentState = {
  getEmployeesByIdDepartment: [],
  getEmployeesByIdDepartmentVacations: [],
  getEmployeesByIdDepartmentJustifications: [],
  getEmployeesByIdDepartmentPdf: [],
};

type EmployeeByIdDepartmentAction = {
  type: string;
  getEmployeesByIdDepartment?: GetEmployeesByIdDepartmentState;
};

export const GetEmployeesByIdDepartmentSlice = createSlice({
  name: "getEmployeesByIdDepartment",
  initialState: initialStateIdDepart,

  reducers: {
    getEmployeesByIdDepartmentReducer: (
      state,
      action: PayloadAction<EmployeesType[]>
    ) => {
      return { ...state, getEmployeesByIdDepartment: action.payload };
    },

    getEmployeesByIdDepartmentVacationsReducer: (
      state,
      action: PayloadAction<EmployeesType[]>
    ) => {
      return {
        ...state,
        getEmployeesByIdDepartmentVacations: action.payload,
      };
    },
    getEmployeesByIdDepartmentJustificationsReducer: (
      state,
      action: PayloadAction<EmployeesType[]>
    ) => {
      return {
        ...state,
        getEmployeesByIdDepartmentJustifications: action.payload,
      };
    },
    getEmployeesByIdDepartmentPdfReducer: (
      state,
      action: PayloadAction<EmployeesType[]>
    ) => {
      return {
        ...state,
        getEmployeesByIdDepartmentPdf: action.payload,
      };
    },

    resetEmployeesByIdDepartmentReducer: (state) => {
      state.getEmployeesByIdDepartment =
        initialStateIdDepart.getEmployeesByIdDepartment;
    },
  },
});

export const {
  getEmployeesByIdDepartmentReducer,
  resetEmployeesByIdDepartmentReducer,
  getEmployeesByIdDepartmentVacationsReducer,
  getEmployeesByIdDepartmentJustificationsReducer,
  getEmployeesByIdDepartmentPdfReducer,
} = GetEmployeesByIdDepartmentSlice.actions;
export const GetEmployeesByIdDepartmentReducerReducer =
  GetEmployeesByIdDepartmentSlice.reducer;
export type DispatchTypeByIdDepart = (
  args: EmployeeByIdDepartmentAction
) => EmployeeByIdDepartmentAction;
