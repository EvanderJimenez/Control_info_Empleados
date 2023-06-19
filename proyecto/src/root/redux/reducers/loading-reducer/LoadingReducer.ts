import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
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
      return { loading: action.payload };
    },
  },
});

export const { setLoading } = LoadSlice.actions;
export const LoadReducer = LoadSlice.reducer;
export type DispatchTypeLoading = (args: LoadAction) => LoadAction;
function useToasts(): { success: any } {//TODO: Remove all dead code
  throw new Error("Function not implemented.");
}
