import { DispatchTypeLoadData, loadDataReducer } from "../../reducers/loading-reducer/LoadDataReducer";

export const StartLoadData = (state: boolean): any => {
    return async (dispatch: DispatchTypeLoadData) => {
      dispatch(loadDataReducer(state));
    };
  };