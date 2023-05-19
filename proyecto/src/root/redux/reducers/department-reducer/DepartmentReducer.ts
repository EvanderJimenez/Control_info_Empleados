import { Department } from '@/root/interface/departments';
import { getDepartmentByIdProvider } from './../../provider/department-provider/department.provider';
import { DepartmentType } from "@/root/types/Department.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DepartmentState {

    getDepartmentById: DepartmentType | null

}

export const initialState : DepartmentState ={ //ver nombre
    getDepartmentById : null
}

type DepartmentAction = {
type : string
department?:DepartmentState 
}

export const DepartmentSlice = createSlice({
    
    name:"Departments",
    initialState,

    reducers: {

        getDepartmentByIdReducer: (state, action: PayloadAction<DepartmentType>) => {
            state.getDepartmentById = action.payload;
        }

    }

})

export const {getDepartmentByIdReducer} = DepartmentSlice.actions;
export const DepartmentReducer = DepartmentSlice.reducer;
export type DispatchType = (args: DepartmentAction) => DepartmentAction;