import  { RootState }  from  '@/root/redux/store';

export  const  selectGetDepartmentById  =  (state:  RootState)  =>  state.getDepartmentByIdStore.getDepartmentById;

export  const  selectGetAllDepartment  =  (state:  RootState)  =>  state.getAllDepartmentStore.getAllDepartments;