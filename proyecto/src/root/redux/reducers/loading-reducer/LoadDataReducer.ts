import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadDataState {
  loadData: boolean;
}
export const initialStateLoadData: LoadDataState = {
    loadData: false,
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
      return { loadData: action.payload };
    },
  },
});

export const { loadDataReducer } = LoadDataSlice.actions;
export const LoadDataReducer = LoadDataSlice.reducer;
export type DispatchTypeLoadData = (args: LoadDataAction) => LoadDataAction;
