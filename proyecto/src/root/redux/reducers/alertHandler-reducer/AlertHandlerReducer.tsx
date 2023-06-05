import { AlertType } from "@/root/types/AlertHandler.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface AlertState {
    alert: AlertType;
}

export const initialStateAlert: AlertState = {
    alert: {} as AlertType,
};

type AlertAction = {
    type: string;
    alert?: AlertState;
};

export const AlertSlice = createSlice({
    name: "alert",
    initialState: initialStateAlert,

    reducers: {

        successAlert: (state, action: PayloadAction<AlertType>) => {
            toast.success(action.payload.textForAlert);
            return { alert: action.payload }
        },
        errorAlert: (state, action: PayloadAction<AlertType>) => {
            toast.error(action.payload.textForAlert);
            return { alert: action.payload }
        },
        loadingAlert: (state, action: PayloadAction<AlertType>) => {
            if (action.payload.unfolded) {
                toast.loading(action.payload.textForAlert);
            }
            return { alert: action.payload }
        },
    },
});


export const { successAlert, errorAlert, loadingAlert } = AlertSlice.actions;
export const AlertReducer = AlertSlice.reducer;
export type DispatchTypeAlert = (args: AlertAction) => AlertAction;