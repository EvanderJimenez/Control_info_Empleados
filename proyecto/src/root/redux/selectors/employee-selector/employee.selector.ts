import  { RootState }  from  '@/root/redux/store';

export  const  selectDeleteEmployee  =  (state:  RootState)  =>  state.deleteEmployeeStore.deleteEmployee;

export  const  selectListOfEmployee  =  (state:  RootState)  =>  state.employeesListStore.employees

export  const  selectCreateEmployee  =  (state:  RootState)  =>  state.createEmployeeStore.createEmploye

export  const  selectUpdateEmployee  =  (state:  RootState)  =>  state.updateEmployeeStore.updateEmployee

export  const  selectGetEmployeeByUid  =  (state:  RootState)  =>  state.getEmployeeByUidStore.getEmployeeByUid
