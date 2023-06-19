import { AlertType } from "@/root/types/AlertHandler.type";
import { DispatchTypeAlert, errorAlert, loadingAlert, successAlert } from "../../reducers/alertHandler-reducer/AlertHandlerReducer";



export const starAlertSuccess = (textForAlert: string, unfolded: boolean): any => {//TODO: Type all variables that you use
    return async (dispatch: DispatchTypeAlert) => {

        const alertType: AlertType = {
            textForAlert: textForAlert,
            unfolded: unfolded
        };
        dispatch(successAlert(alertType));
    };
};

export const starAlertError = (textForAlert: string, unfolded: boolean): any => {//TODO: Type all variables that you use
    return async (dispatch: DispatchTypeAlert) => {

        const errorType: AlertType = {
            textForAlert: textForAlert,
            unfolded: unfolded
        };
        dispatch(errorAlert(errorType));
    };
};

export const starAlertLoading= (textForAlert: string, unfolded: boolean): any => {//TODO: Type all variables that you use
    return async (dispatch: DispatchTypeAlert) => {

        const loadingType: AlertType = {
            textForAlert: textForAlert,
            unfolded: unfolded
        };
        dispatch(loadingAlert(loadingType));
    };
};