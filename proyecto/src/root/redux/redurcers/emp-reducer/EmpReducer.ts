import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteEmployee} from "../../../types/Employee.type";

//TODO: Quitar null, agregar toda la información del empleado
interface EmpState {
  deleteEmployee: DeleteEmployee | null;
}

type EmployeeAction = {
  type: string;
  delete?: EmpState;  //Cambiar por empleado en general
};

//We declared the initial state for the reducer
export const initialState: EmpState = {
  deleteEmployee: null,
};

export const EmployeeSlice = createSlice({
  name: "Emp",  //Cambiar por nombre completo 
  initialState,

  reducers: {
    DeleteEmp: (state, action: PayloadAction<DeleteEmployee>) => { //Min
      return  {...state,deleteEmployee:action.payload}
      //state.deleteEmployee = action.payload; //we add the deleted employee in the state.deleteEmployee with the payload function
    },
    UpdateEmp: (state, action: PayloadAction<any>) => {},
  },
});

export const { DeleteEmp } = EmployeeSlice.actions;
export const EmployeeReducer = EmployeeSlice.reducer;
export type DispatchType = (args: EmployeeAction) => EmployeeAction;
