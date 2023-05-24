import { dismissByUidProvider, getByVariableProvider, getEmployeeByCedulaProvider, getEmployeeByNameProvider } from "./../../provider/employee-provider/employee.provider";
import { DispatchType, dismissEmployeeReducer, getByVariableReducer, getEmployeeByCedulaReducer, getEmployeeByNameReducer } from "./../../reducers/employee-reducer/EmployeeReducer";
import { deleteEmployeeReducer, listEmployeeReducer, createEmployeesReducer, updateEmployeeReducer, getEmployeeByUidReducer, loginReducer } from "../../reducers/employee-reducer/EmployeeReducer";
import {
  deleteEmployeeProvider,
  employeeListProvider,
  createEmployeeProvider,
  upDatEmployeeProvider,
  getEmployeeByUidProvider,
  loginProvider,
} from "../../provider/employee-provider/employee.provider";
import { UserData } from "@/root/interface/employee";
import { EmployeesType } from "@/root/types/Employee.type";
import { setLoading } from "../../reducers/loading-reducer/LoadingReducer";

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

export const StartDismissEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const employee = await dismissByUidProvider(searchTerm);

      console.log("data thunk:" + JSON.stringify(employee));

      dispatch(dismissEmployeeReducer(employee || null));
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

export const StartCreateEmployee = (searchTerm: EmployeesType): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      const employee = await createEmployeeProvider(searchTerm);

      dispatch(createEmployeesReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};

export const StartUpDateEmployee = (searchUser: string, searchTerm: EmployeesType): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await upDatEmployeeProvider(searchUser, searchTerm);

      dispacth(updateEmployeeReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartGetEmployeeByCedula = (searchTerm: string): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await getEmployeeByCedulaProvider(searchTerm);

      dispacth(getEmployeeByCedulaReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};
export const StartGetEmployeeByName = (searchTerm: string): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await getEmployeeByNameProvider(searchTerm);

      dispacth(getEmployeeByNameReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartGetEmployeeByUid = (searchTerm: string): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await getEmployeeByUidProvider(searchTerm);

      dispacth(getEmployeeByUidReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};
export const StartLogin = (searchTerm1: string, searchTerm2: string): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      const response = await loginProvider(searchTerm1, searchTerm2);

      dispatch(loginReducer(response || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(true));
  };
};

export const StartGetByVariable = (searchTerm1: string, searchTerm2: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await getByVariableProvider(searchTerm1, searchTerm2);

      dispatch(getByVariableReducer(response || null));
    } catch (error) {
      console.log(error);
    }
  }
}


export const StarGetVacationsByUid = (searchTerm: string) : any => {
  return async (dispatch: DispatchType) => {
    try {

      const response = await getVacationsByUidProvider(searchTerm);

      dispatch(getVacationsByUidReducer(response || null));

    } catch (error) {
      console.log(error)
    }
  }
}

export const StarGetEmployeesByIdDepartment = (searchTerm: string) : any => {
  return async (dispatch: DispatchType) => {
    try {

      const response = await getEmployeesByIdDepartProvider(searchTerm);

      dispatch(getEmployeesByIdDepartmentReducer(response || null));

    } catch (error) {
      console.log(error)
    }
  }
}
  
