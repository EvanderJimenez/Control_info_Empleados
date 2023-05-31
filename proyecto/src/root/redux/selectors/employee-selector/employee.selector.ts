import { RootState } from "../../store";

export  const  selectUploadFile =  (state:  RootState)  =>  state.uploadFile.updateFileEmployee;

export  const  selectDeleteEmployee  =  (state:  RootState)  =>  state.deleteEmployeeStore.deleteEmployee;

export  const  selectDismissEmployee  =  (state:  RootState)  =>  state.dismissEmployeeStore.dismissEmployee;

export  const  selectListOfEmployee  =  (state:  RootState)  =>  state.employeesListStore.listEmployees

export  const  selectCreateEmployee  =  (state:  RootState)  =>  state.createEmployeeStore.createEmployee

export  const  selectUpdateEmployee  =  (state:  RootState)  =>  state.updateEmployeeStore.updateEmployee

export  const  selectGetEmployeeByUid  =  (state:  RootState)  =>  state.getEmployeeByUidStore.getEmployeeByUid


export const selectLogin = (state: RootState) => state.loginStore.login;

export const selectGetByVariable = (state: RootState) => state.getByVariableStore.getByVariable;

export const selectGetAllBosses = (state: RootState) => state.getAllBossesStore.getAllBosses;

export  const  selectGetVacationsByUid  =  (state:  RootState)  =>  state.getVacationsByUidStore.getVacationsByUid;

export  const  selectGetEmployeesByIdDepartment =  (state:  RootState)  =>  state.getEmployeesByIdDepartmentStore.getEmployeesByIdDepartment;

