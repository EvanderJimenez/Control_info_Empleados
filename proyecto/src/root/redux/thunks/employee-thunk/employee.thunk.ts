import { EmployeesType } from "@/root/types/Employee.type";
import { setLoading } from "../../reducers/loading-reducer/LoadingReducer";

import {
  DispatchTypeDelete,
  deleteEmployeeReducer,
} from "../../reducers/employee-reducer/deleteEmployee/DeleteEmployeeReducer";
import {
  DispatchTypeDismiss,
  dismissEmployeeReducer,
} from "../../reducers/employee-reducer/dismissEmployee/DismissEmployeeReducer";
import {
  DispatchTypeListEmployee,
  listEmployeesReducer,
} from "../../reducers/employee-reducer/listEmployees/ListEmployeeReducer";
import {
  DispatchTypeCreate,
  createEmployeeReducer,
} from "../../reducers/employee-reducer/createEmployee/CreateEmployeeReducer";
import {
  DispatchTypeUpdate,
  updateEmployeeReducer,
} from "../../reducers/employee-reducer/updateEmployee/UpdateEmployeeReducer";
import {
  DispatchTypeEmployeeByUid,
  getEmployeeByUidReducer,
  resetEmployeeByUid,
} from "../../reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer";
import {
  DispatchTypeByVariable,
  getByVariableReducer,
  resetByVariable,
} from "../../reducers/employee-reducer/getByVariable/GetByVariableReducer";
import {
  DispatchTypeVacations,
  getVacationsByUidReducer,
} from "../../reducers/employee-reducer/getVacationsByUid/GetVacationsByUidReducers";
import {
  DispatchTypeByIdDepart,
  getEmployeesByIdDepartmentReducer,
} from "../../reducers/employee-reducer/getEmployeesByIdDepartment/GetEmployeesByIdDepartmentReducer";
import {
  DispatchTypeAllBoss,
  getAllBossReducer,
} from "../../reducers/employee-reducer/getAllBosses/GetAllBossesReducer";
import {
  DispatchTypeLogin,
  loginReducer,
} from "../../reducers/login-reducer/loginReducer";
import { providerRedux } from "../../provider";
import { toast } from "react-hot-toast";
import { DispatchTypeUpdateFile, updateFileEmployeeReducer } from "../../reducers/employee-reducer/uploadFile/UploadFile";
import { DispatchTypeGetFileURLByName, GetFileURLByNameReducer, getFileURLByNameReducer } from "../../reducers/employee-reducer/getFileURLByName/getFileURLByNameReducer";

export const StartDeletingEmployee = (employeeId: string): any => {
  return async (dispatch: DispatchTypeDelete) => {
    dispatch(setLoading(true));
    try {
      const empDeleted = await providerRedux.deleteEmployeeProvider(employeeId);
      dispatch(deleteEmployeeReducer(empDeleted || null));
      const employeeList = await providerRedux.employeeListProvider();
      if (Array.isArray(employeeList)) {
        dispatch(listEmployeesReducer(employeeList));
      }
    } catch (error) {
      toast.error("Error deleting employee");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const StartDismissEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeDismiss) => {
    dispatch(setLoading(true));
    const employee = await providerRedux.dismissByUidProvider(searchTerm);

    dispatch(dismissEmployeeReducer(employee || null));

    dispatch(setLoading(false));
  };
};

export const StartListOfEmployee = (): any => {
  return async (dispatch: DispatchTypeListEmployee) => {
    const employeeList = await providerRedux.employeeListProvider();
    dispatch(setLoading(true));
    if (Array.isArray(employeeList)) {
      dispatch(listEmployeesReducer(employeeList));
    }
    dispatch(setLoading(false));
  };
};

export const StartCreateEmployee = (searchTerm: EmployeesType): any => {
  return async (dispatch: DispatchTypeCreate) => {
    dispatch(setLoading(true));

      const employee = await providerRedux.createEmployeeProvider(searchTerm);

      dispatch(createEmployeeReducer(employee || null));

    dispatch(setLoading(false));
  };
};

export const StartUpDateEmployee = (
  searchUser: string,
  searchTerm: EmployeesType
): any => {
  return async (dispatch: DispatchTypeUpdate) => {
    const employee = await providerRedux.upDatEmployeeProvider(
      searchUser,
      searchTerm
    );

    dispatch(updateEmployeeReducer(employee || null));
  };
};

export const StartUpDateFileEmployee = (
  searchTerm: string,
  searchUser: string,
  nameFile: string,
  typeFile: string
 
): any => {
  return async (dispatch: DispatchTypeUpdateFile) => {
    const employee = await providerRedux.uploadFileProvider(
      searchTerm,
      searchUser,
      nameFile,
      typeFile
    );

    dispatch(updateFileEmployeeReducer(employee || null));
  };
};


export const StartGetEmployeeByUid = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    
      const employee = await providerRedux.getEmployeeByUidProvider(searchTerm);

      dispatch(getEmployeeByUidReducer(employee || null));

  };
};

export const ResetEmployeeByUid = (): any => {
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    dispatch(resetEmployeeByUid());
  };
};

export const StartLogin = (searchTerm1: string, searchTerm2: string): any => {
  return async (dispatch: DispatchTypeLogin) => {
    dispatch(setLoading(true));
    const response = await providerRedux.loginProvider(
      searchTerm1,
      searchTerm2
    );

    dispatch(loginReducer(response || null));

    dispatch(setLoading(false));
  };
};

export const StartGetByVariable = (
  searchTerm1: string,
  searchTerm2: string,
  searchTerm3: string
): any => {
  return async (dispatch: DispatchTypeByVariable) => {
    const response = await providerRedux.getByVariableProvider(
      searchTerm1,
      searchTerm2,
      searchTerm3
    );

    dispatch(getByVariableReducer(response || null));
  };
};

export const ResetByVariable = (): any => {
  return async (dispatch: DispatchTypeByVariable) => {
    dispatch(resetByVariable());
  };
};

export const StarGetVacationsByUid = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeVacations) => {
    const response = await providerRedux.getVacationsByUidProvider(searchTerm);

    //dispatch(EmployeeSlice.actions.getVacationsByUidReducer(response || null));

    dispatch(getVacationsByUidReducer(response || null));
  };
};

export const StarGetEmployeesByIdDepartment = (searchTerm: string): any => {
  return async (dispatch: DispatchTypeByIdDepart) => {
    const response = await providerRedux.getEmployeesByIdDepartProvider(
      searchTerm
    );

    dispatch(getEmployeesByIdDepartmentReducer(response || null));
  };
};

export const StarGetFileURLByName  = (uid: string,searchTerm: string): any => {
  return async (dispatch: DispatchTypeGetFileURLByName) => {
    const response = await providerRedux.getFileURLByName( uid,
      searchTerm
    );

    dispatch(getFileURLByNameReducer(response || null));
  };
};

export const StarGetAllBosses = (): any => {
  return async (dispatch: DispatchTypeAllBoss) => {
    const response = await providerRedux.getAllBossesProvider();

    dispatch(getAllBossReducer(response || null));
  };
};
