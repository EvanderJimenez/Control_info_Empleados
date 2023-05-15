import  { RootState }  from  '@/root/redux/store';

export  const  deleteEmployee  =  (state:  RootState)  =>  state.generalStore.deleteEmployee;

export  const  listOfEmployee  =  (state:  RootState)  =>  state.employeesList.employees