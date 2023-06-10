import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadDataState {
  loadData: boolean;
  loadDataBoss: boolean;
}
export const initialStateLoadData: LoadDataState = {
    loadData: false,
    loadDataBoss: false
};

type LoadDataAction = {
  type: string;
  loadData?: LoadDataState;
};

export const LoadDataSlice = createSlice({
  name: "LoadData",
  initialState: initialStateLoadData,

  reducers: {
    loadDataReducer: (state, action: PayloadAction<boolean>) => {
      return {...state, loadData: action.payload };
    },
    loadDataBossReducer: (state, action: PayloadAction<boolean>) => {
      return {...state, loadDataBoss: action.payload };
    },
  },
});

export const { loadDataReducer,loadDataBossReducer } = LoadDataSlice.actions;
export const LoadDataReducer = LoadDataSlice.reducer;
export type DispatchTypeLoadData = (args: LoadDataAction) => LoadDataAction;
