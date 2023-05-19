import  { RootState }  from  '@/root/redux/store';

export  const  selectDeleteEmployee  =  (state:  RootState)  =>  state.deleteEmployeeStore.deleteEmployee;

export  const  selectListOfEmployee  =  (state:  RootState)  =>  state.employeesListStore.employees

export  const  selectCreateEmployee  =  (state:  RootState)  =>  state.createEmployeeStore.createEmploye

export  const  selectUpdateEmployee  =  (state:  RootState)  =>  state.updateEmployeeStore.updateEmployee

export  const  selectGetEmployeeByUid  =  (state:  RootState)  =>  state.getEmployeeByUidStore.getEmployeeByUid

export  const  selectGetEmployeeByCedula  =  (state:  RootState)  =>  state.getEmployeeByCedulaStore.getEmployeeByCedula

export  const  selectGetEmployeeByName  =  (state:  RootState)  =>  state.getEmployeeByNameStore.getEmployeeByName

export  const  selectLogin  =  (state:  RootState)  =>  state.loginStore.loginUser


export  const  loading  =  (state:  RootState)  =>  state.loading.loading;
