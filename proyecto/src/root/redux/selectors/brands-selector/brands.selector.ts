import  { RootState }  from  '@/root/redux/store';

export  const  selectGetAllBrands  =  (state:  RootState)  =>  state.getAllBrans.getAllBrands;

export  const  selectGetBrandsByIdEmployee  =  (state:  RootState)  =>  state.GetBrandsByIdEmployee.getBrandsByIdEmployee;

export  const  selectUpdateBrands  =  (state:  RootState)  =>  state.updateBrands.UpdateBrands
