import { DispatchType, deleteEmp, listEmp } from "../../redurcers/employee-reducer/EmployeeReducer";
import { employeeProvider,employeeListProvider } from "../../provider/employee-provider/employee.provider";



export const deletingEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const empDeleted = await employeeProvider(searchTerm);

      dispatch(deleteEmp(empDeleted || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const listOfEmployee = (): any => {
  return async (dispatch: DispatchType) => {
    const employeeList = await employeeListProvider();

    if (Array.isArray(employeeList)) {
      dispatch(listEmp(employeeList));
    } else {
      console.log("Invalid employee list");
    }
  };
};