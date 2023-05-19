import  { RootState }  from  '@/root/redux/store';

export  const  deleteEmployee  =  (state:  RootState)  =>  state.generalStore.deleteEmployee;

export  const  listOfEmployee  =  (state:  RootState)  =>  state.employeesList.employees

export  const  createEmployee  =  (state:  RootState)  =>  state.createEmployee.createEmploye

export  const  updateEmployee  =  (state:  RootState)  =>  state.updateEmployee.updateEmployee

export  const  loading  =  (state:  RootState)  =>  state.loading.loading