import { DeleteEmployeeType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EmployeeDeleteState {
  deleteEmployee: DeleteEmployeeType;
}

export const initialStateDelete: EmployeeDeleteState = {
  deleteEmployee: {
    id: "",
  },
};

type EmployeeDeleteAction = {
  type: string;
  deleteEmployee?: EmployeeDeleteState;
};

export const EmployeeDeleteSlice = createSlice({
  name: "deleteEmployee",
  initialState: initialStateDelete,

  reducers: {
    deleteEmployeeReducer: (
      state,
      action: PayloadAction<DeleteEmployeeType>
    ) => {
      return { deleteEmployee: action.payload };
    },
  },
});

export const { deleteEmployeeReducer } = EmployeeDeleteSlice.actions;
export const DeleteEmployeesReducer = EmployeeDeleteSlice.reducer;
export type DispatchTypeDelete = (
  args: EmployeeDeleteAction
) => EmployeeDeleteAction;
