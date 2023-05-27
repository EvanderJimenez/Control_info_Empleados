import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LoadState {
  loading: boolean;
}
export const initialStateLoading: LoadState = {
  loading: false,
};

type LoadAction = {
  type: string;
  load?: LoadState;
};

export const LoadSlice = createSlice({
  name: "Load",
  initialState: initialStateLoading,

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = LoadSlice.actions;
export const LoadReducer = LoadSlice.reducer;
export type DispatchTypeLoading = (args: LoadAction) => LoadAction;
