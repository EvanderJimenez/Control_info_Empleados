import { DispatchType, deleteEmployeeReducer, listEmployeeReducer, createEmployeesReducer,updateEmployeeReducer,getEmployeeByUidReducer } from "../../redurcers/employee-reducer/EmployeeReducer";
import { deleteEmployeeProvider,employeeListProvider, createEmployeeProvider, upDatEmployeeProvider, getEmployeeByUidProvider } from "../../provider/employee-provider/employee.provider";
import { UserData } from "@/root/interface/employee";
import { EmployeesType } from "@/root/types/Employee.type";




export const StartDeletingEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const empDeleted = await deleteEmployeeProvider(searchTerm);

      dispatch(deleteEmployeeReducer(empDeleted || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartListOfEmployee = (): any => {
  return async (dispatch: DispatchType) => {
    const employeeList = await employeeListProvider();

    if (Array.isArray(employeeList)) {
      dispatch(listEmployeeReducer(employeeList));
    } else {
      console.log("Invalid employee list");
    }
  };
};

export const StartCreateEmployee = (searchTerm: UserData) : any => {

  return async (dispatch: DispatchType) => {
    try {

      const employee = await createEmployeeProvider(searchTerm)

      dispatch(createEmployeesReducer(employee || null))

    } catch (error) {
      console.log(error);
    }
  }
}

export const StartUpDateEmployee = (searchUser: string, searchTerm: EmployeesType): any => {

  return async (dispacth: DispatchType) => {

    try {

      const employee = await upDatEmployeeProvider(searchUser,searchTerm)

      dispacth(updateEmployeeReducer(employee || null))

    } catch (error) {
      console.log(error)
    }

  }
}

export const StartGetEmployeeByUid = (searchTerm: string) : any => {

  return async (dispacth: DispatchType) => {

    try {
      const employee = await getEmployeeByUidProvider(searchTerm)

      dispacth(getEmployeeByUidReducer(employee || null))

    } catch (error) {
      console.log(error)
    }

  }

}