import { DeleteEmployeeType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface EmployeeDeleteState {
    deleteEmployee: DeleteEmployeeType
  }

  export const initialState: EmployeeDeleteState = {
    deleteEmployee: {
        id: ""
    }
  };


  type EmployeeAction = {
    type: string;
    getVacationsByUid?: EmployeeDeleteState;
  };

  export const EmployeeDeleteSlice = createSlice({
    name: "deleteEmployee",
    initialState: initialState,

    reducers: {

        deleteEmployeeReducer: (state, action: PayloadAction<DeleteEmployeeType>) =>{
        return {deleteEmployee: action.payload}
      },
    },
  });

  export const {deleteEmployeeReducer} = EmployeeDeleteSlice.actions;
  export const DeleteEmployeesReducer = EmployeeDeleteSlice.reducer;
  export type DispatchTypeDelete = (args: EmployeeAction) => EmployeeAction;