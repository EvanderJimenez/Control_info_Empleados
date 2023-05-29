import  { RootState }  from  '@/root/redux/store';

export  const  selectGetDepartmentById  =  (state:  RootState)  =>  state.getDepartmentByIdStore.getDepartmentByDocId;

export  const  selectGetAllDepartment  =  (state:  RootState)  =>  state.getAllDepartmentStore.getAllDepartments;

export  const  selectGetByIdDocDepartment  =  (state:  RootState)  =>  state.getDepartmentByIdDocStore.getDepartmentByDocId;

//export const  selectID = (state: RootState) => state.getIDStore.ID;