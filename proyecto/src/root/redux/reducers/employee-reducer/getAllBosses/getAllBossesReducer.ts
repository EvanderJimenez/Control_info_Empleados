import {  EmployeesType } from "@/root/types/Employee.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface GetAllBossesState {
    getAllBosses: EmployeesType []
  }

  export const initialStateAllBoss: GetAllBossesState = {
    getAllBosses:[]

};

  type EmployeeGetAllAction = {
    type: string;
    getAllBosses?: GetAllBossesState;
  };

  export const getAllBossSlice = createSlice({
    name: "getAllBosses",
    initialState: initialStateAllBoss,

    reducers: {

        getAllBossReducer: (state, action: PayloadAction<EmployeesType[]>) =>{
        return {getAllBosses: action.payload}
      },
    },
  });

  export const {getAllBossReducer} = getAllBossSlice.actions;
  export const GetAllBossReducer = getAllBossSlice.reducer;
  export type DispatchTypeAllBoss = (args: EmployeeGetAllAction) => EmployeeGetAllAction;