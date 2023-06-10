import { DispatchTypeLoadData, loadDataBossReducer, loadDataReducer } from "../../reducers/loading-reducer/LoadDataReducer";

export const StartLoadData = (state: boolean): any => {
    return async (dispatch: DispatchTypeLoadData) => {
      dispatch(loadDataReducer(state));
    };
  };

  export const StartLoadDataBoss = (state: boolean): any => {
    return async (dispatch: DispatchTypeLoadData) => {
      dispatch(loadDataBossReducer(state));
    };
  };