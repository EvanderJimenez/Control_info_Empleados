import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IDState {
  ID: string;
}
export const initialStateID: IDState = {
  ID: "",
};

type IDAction = {
  type: string;
  ID?: IDState;
};

export const IDSlice = createSlice({
  name: "IDreducer",
  initialState: initialStateID,

  reducers: {
    getID: (state, action: PayloadAction<string>) => {
      state.ID = action.payload;
    },
  },
});

export const { getID } = IDSlice.actions;
export const IDreducer = IDSlice.reducer;
export type DispatchID = (args: IDAction) => IDAction;
