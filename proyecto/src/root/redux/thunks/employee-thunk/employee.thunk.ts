import { EmployeesType } from "@/root/types/Employee.type";
import { setLoading } from "../../reducers/loading-reducer/LoadingReducer";

import { providerRedux } from "../../provider";
import { DispatchTypeDelete, deleteEmployeeReducer } from "../../reducers/employee-reducer/deleteEmployee/deleteEmployeeReducer";
import { DispatchTypeDismiss, dismissEmployeeReducer } from "../../reducers/employee-reducer/dismissEmployee/dismissEmployeeReducer";
import { DispatchTypeListEmployee, listEmployeesReducer } from "../../reducers/employee-reducer/listEmployees/listEmployeeReducer";
import { DispatchTypeCreate, createEmployeeReducer } from "../../reducers/employee-reducer/createEmployee/createEmployeeReducer";
import { DispatchTypeUpdate, updateEmployeeReducer } from "../../reducers/employee-reducer/updateEmployee/updateEmployeeReducer";
import { DispatchTypeLogin, loginReducer } from "../../reducers/login-reducer/loginReducer";
import { DispatchTypeEmployeeByUid, getEmployeeByUidReducer } from "../../reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer";
import { DispatchTypeByVariable, getByVariableReducer } from "../../reducers/employee-reducer/getByVariable/getByVariableReducer";
import { DispatchTypeVacations, getVacationsByUidReducer } from "../../reducers/employee-reducer/getVacationsByUid/getVacationsByUidReducers";
import { DispatchTypeByIdDepart, getEmployeesByIdDepartmentReducer } from "../../reducers/employee-reducer/getEmployeesByIdDepartment/getEmployeesByIdDepartmentReducer";
import { DispatchTypeAllBoss, getAllBossReducer } from "../../reducers/employee-reducer/getAllBosses/getAllBossesReducer";

export const StartDeletingEmployee = (employeeId: string): any => {
  return async (dispatch: DispatchTypeDelete) => {
    dispatch(setLoading(true));
    try {
      const empDeleted = await providerRedux.deleteEmployeeProvider(employeeId);
      dispatch(deleteEmployeeReducer(empDeleted || null));
      const employeeList = await providerRedux.employeeListProvider();
      if (Array.isArray(employeeList)) {
        dispatch(listEmployeesReducer(employeeList));
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
  return async (dispatch: DispatchTypeDismiss) => {
    dispatch(setLoading(true));
    try {
      const employee = await providerRedux.dismissByUidProvider(searchTerm);

      dispatch(dismissEmployeeReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};

export const StartListOfEmployee = (): any => {
  return async (dispatch: DispatchTypeListEmployee) => {
    const employeeList = await providerRedux.employeeListProvider();
    dispatch(setLoading(true));
    if (Array.isArray(employeeList)) {
      dispatch(listEmployeesReducer(employeeList));
    } else {
      console.log("Invalid employee list");
    }
    dispatch(setLoading(false));
  };
};

export const StartCreateEmployee = (searchTerm: EmployeesType): any => {
  return async (dispatch: DispatchTypeCreate) => {
    dispatch(setLoading(true));
    try {
      const employee = await providerRedux.createEmployeeProvider(searchTerm);

      dispatch(createEmployeeReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};

export const StartUpDateEmployee = (searchUser: string, searchTerm: EmployeesType): any => {
  return async (dispatch: DispatchTypeUpdate) => {
    try {
      const employee = await providerRedux.upDatEmployeeProvider(searchUser, searchTerm);

      dispatch(updateEmployeeReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartGetEmployeeByUid = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    try {
      const employee = await providerRedux.getEmployeeByUidProvider(searchTerm);

      dispatch(getEmployeeByUidReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};
export const StartLogin = (searchTerm1: string, searchTerm2: string): any => {
  return async (dispatch: DispatchTypeLogin) => {
    dispatch(setLoading(true));
    try {
      const response = await providerRedux.loginProvider(searchTerm1, searchTerm2);

      dispatch(loginReducer(response || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};

export const StartGetByVariable = (searchTerm1: string, searchTerm2: string): any => {
  return async (dispatch: DispatchTypeByVariable) => {
    try {
      const response = await providerRedux.getByVariableProvider(searchTerm1, searchTerm2);

      dispatch(getByVariableReducer(response || null));
    } catch (error) {
      console.log(error);
    }
  }
}


export const StarGetVacationsByUid = (searchTerm: string) : any => {
  return async (dispatch: DispatchTypeVacations) => {
    try {

      const response = await providerRedux.getVacationsByUidProvider(searchTerm);

      //dispatch(EmployeeSlice.actions.getVacationsByUidReducer(response || null));

      dispatch(getVacationsByUidReducer(response || null));

    } catch (error) {
      console.log(error)
    }
  }
}

export const StarGetEmployeesByIdDepartment = (searchTerm: string) : any => {
  return async (dispatch: DispatchTypeByIdDepart) => {
    try {

      const response = await providerRedux.getEmployeesByIdDepartProvider(searchTerm);

      dispatch(getEmployeesByIdDepartmentReducer(response || null));

    } catch (error) {
      console.log(error)
    }
  }
}

export const StarGetAllBosses = () : any => {
  return async (dispatch: DispatchTypeAllBoss) => {
    try {

      const response = await providerRedux.getAllBossesProvider();

      dispatch(getAllBossReducer(response || null));

    } catch (error) {
      console.log(error)
    }
  }
}