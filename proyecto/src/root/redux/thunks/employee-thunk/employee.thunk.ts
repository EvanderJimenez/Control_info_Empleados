import { DispatchType, deleteEmp, listEmp } from "../../redurcers/employee-reducer/EmployeeReducer";//TODO:You should use relative paths with @
import { employeeProvider,employeeListProvider } from "../../provider/employee-provider/employee.provider";//TODO:You should use relative paths with @



export const deletingEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
      const empDeleted = await employeeProvider(searchTerm);

      dispatch(deleteEmp(empDeleted || null));
    } catch (error) {
      console.log(error);//TODO: You should erase all console log
    }
  };
};

export const listOfEmployee = (): any => {
  return async (dispatch: DispatchType) => {
    const employeeList = await employeeListProvider();

    if (Array.isArray(employeeList)) {
      dispatch(listEmp(employeeList));
    } else {//TODO: You should not use else or simplify the complex with reverse if
      console.log("Invalid employee list");//TODO: You should erase all console log
    }
  };
};