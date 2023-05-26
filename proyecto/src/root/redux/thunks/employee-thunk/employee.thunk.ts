import { DispatchType, getByVariableReducer } from "./../../reducers/employee-reducer/EmployeeReducer";

import { EmployeeSlice } from "../../reducers/employee-reducer/EmployeeReducer";

import { EmployeesType } from "@/root/types/Employee.type";
import { setLoading } from "../../reducers/loading-reducer/LoadingReducer";

import { providerRedux } from "../../provider";

export const StartDeletingEmployee = (employeeId: string): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      const empDeleted = await providerRedux.deleteEmployeeProvider(employeeId);
      dispatch(EmployeeSlice.actions.deleteEmployeeReducer(empDeleted || null));
      const employeeList = await providerRedux.employeeListProvider();
      if (Array.isArray(employeeList)) {
        dispatch(EmployeeSlice.actions.listEmployeeReducer(employeeList));
      } else {
        console.log("Invalid employee list");
      }
    } catch (error) {
      console.log("Error deleting employee:", error);
    } finally {
      dispatch(EmployeeSlice.actions.setLoading(false));
    }
  };
};

export const StartDismissEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      const employee = await providerRedux.dismissByUidProvider(searchTerm);

      dispatch(EmployeeSlice.actions.dismissEmployeeReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(EmployeeSlice.actions.setLoading(false));
  };
};

export const StartListOfEmployee = (): any => {
  return async (dispatch: DispatchType) => {
    const employeeList = await providerRedux.employeeListProvider();
    dispatch(setLoading(true));
    if (Array.isArray(employeeList)) {
      dispatch(EmployeeSlice.actions.listEmployeeReducer(employeeList));
    } else {
      console.log("Invalid employee list");
    }
    dispatch(EmployeeSlice.actions.setLoading(false));
  };
};

export const StartCreateEmployee = (searchTerm: EmployeesType): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      const employee = await providerRedux.createEmployeeProvider(searchTerm);

      dispatch(EmployeeSlice.actions.createEmployeesReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};

export const StartUpDateEmployee = (searchUser: string, searchTerm: EmployeesType): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await providerRedux.upDatEmployeeProvider(searchUser, searchTerm);

      dispacth(EmployeeSlice.actions.updateEmployeeReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartGetEmployeeByCedula = (searchTerm: string): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await providerRedux.getEmployeeByCedulaProvider(searchTerm);

      dispacth(EmployeeSlice.actions.getEmployeeByCedulaReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};
export const StartGetEmployeeByName = (searchTerm: string): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await providerRedux.getEmployeeByNameProvider(searchTerm);

      dispacth(EmployeeSlice.actions.getEmployeeByNameReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StartGetEmployeeByUid = (searchTerm: string): any => {
  return async (dispacth: DispatchType) => {
    try {
      const employee = await providerRedux.getEmployeeByUidProvider(searchTerm);

      dispacth(EmployeeSlice.actions.getEmployeeByUidReducer(employee || null));
    } catch (error) {
      console.log(error);
    }
  };
};
export const StartLogin = (searchTerm1: string, searchTerm2: string): any => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading(true));
    try {
      const response = await providerRedux.loginProvider(searchTerm1, searchTerm2);

      dispatch(EmployeeSlice.actions.loginReducer(response || null));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};

export const StartGetByVariable = (searchTerm1: string, searchTerm2: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await providerRedux.getByVariableProvider(searchTerm1, searchTerm2);

      dispatch(EmployeeSlice.actions.getByVariableReducer(response || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StarGetVacationsByUid = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await providerRedux.getVacationsByUidProvider(searchTerm);

      //dispatch(EmployeeSlice.actions.getVacationsByUidReducer(response || null));

      dispatch(getByVariableReducer(response || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StarGetEmployeesByIdDepartment = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await providerRedux.getEmployeesByIdDepartProvider(searchTerm);

      dispatch(EmployeeSlice.actions.getEmployeesByIdDepartmentReducer(response || null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const StarGetAllBosses = (): any => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await providerRedux.getAllBossesProvider();

      dispatch(EmployeeSlice.actions.getAllBossesReducer(response || null));
    } catch (error) {
      console.log(error);
    }
  };
};
