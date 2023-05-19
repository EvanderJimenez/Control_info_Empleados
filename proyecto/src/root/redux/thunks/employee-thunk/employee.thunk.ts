import { DispatchType, deleteEmp, listEmployee, createEmployeesprov, updateEmplo, setLoading } from "../../reducers/employee-reducer/EmployeeReducer";
import { employeeProvider, employeeListProvider, createEmployees, upDatEmployeeProvider } from "../../provider/employee-provider/employee.provider";
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
export const deleteEmployee = (employeeId: string): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      await employeeProvider(employeeId);

      const employeeList = await employeeListProvider();

      if (Array.isArray(employeeList)) {
        dispatch(listEmployee(employeeList));
      } else {
        console.log("Invalid employee list");
      }
    } catch (error) {
      console.log("Error deleting employee:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const listOfEmployee = (): any => {
  return async (dispatch: DispatchType) => {
    const employeeList = await employeeListProvider();

    if (Array.isArray(employeeList)) {
      dispatch(listEmployee(employeeList));
    } else {
      console.log("Invalid employee list");
    }
  };
};

export const createEmployee = (searchTerm: UserData): any => {
  return async (dispatch: DispatchType) => {
    try {
      const employee = await createEmployees(searchTerm);

      dispatch(createEmployeesprov(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const upDateEmployee = (searchUser: string, searchTerm: UserData): any => {
  return async (dispatch: DispatchType) => {
    try {
      const employee = await upDatEmployeeProvider(searchUser, searchTerm);

      dispatch(updateEmplo(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};
