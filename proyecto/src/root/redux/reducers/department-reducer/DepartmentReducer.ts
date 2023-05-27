import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DepartmentState {
  getDepartmentById: DepartmentType | null;
  getAllDepartments: DepartmentType[] | null;
}

export const initialStateDepartment: DepartmentState = {
  getDepartmentById: null,
  getAllDepartments: [],
};

type DepartmentAction = {
  type: string;
  department?: DepartmentState;
};

export const DepartmentSlice = createSlice({
  name: "Departments",
  initialState: initialStateDepartment,

  reducers: {
    getDepartmentByIdReducer: (
      state,
      action: PayloadAction<DepartmentType>
    ) => {
      state.getDepartmentById = action.payload;
    },
    getAllDepartmentReducer: (
      state,
      action: PayloadAction<DepartmentType[]>
    ) => {
      state.getAllDepartments = action.payload;
    },
  },
});

export const { getDepartmentByIdReducer, getAllDepartmentReducer } =
  DepartmentSlice.actions;
export const DepartmentReducer = DepartmentSlice.reducer;
export type DispatchType = (args: DepartmentAction) => DepartmentAction;
