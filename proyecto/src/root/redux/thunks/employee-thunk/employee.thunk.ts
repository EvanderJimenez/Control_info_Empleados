import { DispatchType, deleteEmp, listEmp, createEmployeesprov,updateEmplo } from "../../redurcers/employee-reducer/EmployeeReducer";
import { employeeProvider,employeeListProvider, createEmployees, upDatEmployeeProvider } from "../../provider/employee-provider/employee.provider";
import { UserData } from "@/root/interface/employee";




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

export const createEmployee = (searchTerm: UserData) : any => {

  return async (dispatch: DispatchType) => {
    try {

      const employee = await createEmployees(searchTerm)

      dispatch(createEmployeesprov(employee || null))

    } catch (error) {
      console.log(error);
    }
  }
}

export const upDateEmployee = (searchUser: string, searchTerm: UserData): any => {

  return async (dispacth: DispatchType) => {

    try {

      const employee = await upDatEmployeeProvider(searchUser,searchTerm)

      dispacth(updateEmplo(employee || null))

    } catch (error) {
      console.log(error)
    }

  }


}