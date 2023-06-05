import { RootState } from "@/root/redux/store";

export const selectGetDepartmentById = (state: RootState) =>
  state.getDepartmentByIdStore.getDepartmentByIdEmployee;

export const selectGetAllDepartment = (state: RootState) =>
  state.getAllDepartmentStore.getAllDepartments;

export const selectGetByIdDocDepartment = (state: RootState) =>
  state.getDepartmentByIdDocStore.getDepartmentByDocId;

export const selectGetByNameDepartment = (state: RootState) =>state.getDepartmentByName.getDepartmentByName;

export const selectGetByPageDepartment = (state: RootState) =>state.getDepartmentByPage.getDepartmentByPage;

//export const  selectID = (state: RootState) => state.getIDStore.ID;
