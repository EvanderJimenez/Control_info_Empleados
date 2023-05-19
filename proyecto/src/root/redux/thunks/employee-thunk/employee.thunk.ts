import {
  DispatchType,
  deleteEmployeeReducer,
  listEmployeeReducer,
  createEmployeesReducer,
  updateEmployeeReducer,
  getEmployeeByUidReducer,
  setLoading,
} from "../../reducers/employee-reducer/EmployeeReducer";
import { deleteEmployeeProvider, employeeListProvider, createEmployeeProvider, upDatEmployeeProvider, getEmployeeByUidProvider } from "../../provider/employee-provider/employee.provider";
import { UserData } from "@/root/interface/employee";
import { EmployeesType } from "@/root/types/Employee.type";

export const StartDeletingEmployee = (employeeId: string): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      const empDeleted = await deleteEmployeeProvider(employeeId);
      dispatch(deleteEmployeeReducer(empDeleted || null));
      const employeeList = await employeeListProvider();
      if (Array.isArray(employeeList)) {
        dispatch(listEmployeeReducer(employeeList));
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

export const StartCreateEmployee = (searchTerm: UserData): any => {
  return async (dispatch: DispatchType) => {
    try {
      const employee = await createEmployeeProvider(searchTerm);

      dispatch(createEmployeesReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartUpDateEmployee = (searchUser: string, searchTerm: EmployeesType): any => {
  return async (dispatch: DispatchType) => {
    try {
      const employee = await upDatEmployeeProvider(searchUser, searchTerm);

      dispatch(updateEmployeeReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartGetEmployeeByUid = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const employee = await getEmployeeByUidProvider(searchTerm);

      dispatch(getEmployeeByUidReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};
