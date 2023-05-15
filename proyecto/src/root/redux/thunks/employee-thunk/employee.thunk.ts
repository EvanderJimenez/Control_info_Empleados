import { DispatchType, DeleteEmp } from "../../redurcers/employee-reducer/EmployeeReducer";
import { employeeProvider } from "../../provider/employee-provider/employee.provider";

export const DeletingEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const empDeleted = await employeeProvider(searchTerm);
     
      dispatch(DeleteEmp(empDeleted || null));
    } catch (error) {
      console.log(error);
    }
  };
};
