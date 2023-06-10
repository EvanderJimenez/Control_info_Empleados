import { RootState } from "../../store";

export const loading = (state: RootState) => state.loading.loading;

export const selectLoadData = (state: RootState) => state.LoadDataStore.loadData;