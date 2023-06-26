import { DispatchTypeByVariableAdmin } from './../../reducers/employee-reducer/getByVariableAdmin/getByVariableAdminReducer';
import { EmployeesType } from "@/root/types/Employee.type";
import { setLoading } from "../../reducers/loading-reducer/LoadingReducer";

import {
  DispatchTypeDelete,
  deleteEmployeeReducer,
} from "../../reducers/employee-reducer/deleteEmployee/deleteEmployeeReducer";
import {
  DispatchTypeDismiss,
  dismissEmployeeReducer,
} from "../../reducers/employee-reducer/dismissEmployee/dismissEmployeeReducer";
import {
  DispatchTypeListEmployee,
  listEmployeesReducer,
} from "../../reducers/employee-reducer/listEmployees/listEmployeeReducer";
import {
  DispatchTypeCreate,
  createEmployeeReducer,
} from "../../reducers/employee-reducer/createEmployee/createEmployeeReducer";
import {
  DispatchTypeUpdate,
  updateEmployeeReducer,
} from "../../reducers/employee-reducer/updateEmployee/updateEmployeeReducer";
import {
  DispatchTypeEmployeeByUid,
  getEmployeeByUid2Reducer,
  getEmployeeByUid3Reducer,
  getEmployeeByUidReducer,
  resetEmployeeByUid,
  resetEmployeeByUid2,
  resetEmployeeByUid3,
} from "../../reducers/employee-reducer/getEmployeeByUid/getEmployeeByUidReducer";
import {
  DispatchTypeVacations,
  getVacationsByUidReducer,
} from "../../reducers/employee-reducer/getVacationsByUid/getVacationsByUidReducers";
import {
  DispatchTypeAllBoss,
  getAllBossReducer,
} from "../../reducers/employee-reducer/getAllBosses/getAllBossesReducer";
import {
  DispatchTypeLogin,
  loginReducer,
} from "../../reducers/login-reducer/loginReducer";
import { providerRedux } from "../../provider";
import { toast } from "react-hot-toast";
import { getByVariableAdminReducer, resetByVariableAdmin } from "../../reducers/employee-reducer/getByVariableAdmin/getByVariableAdminReducer";
import {
  DispatchTypeUpdateFile,
  updateFileEmployeeReducer,
} from "../../reducers/employee-reducer/uploadFile/UploadFile";
import {
  DispatchTypeGetFileURLByName,
  getFileURLByNameReducer,
  resetUrlReducer,
} from "../../reducers/employee-reducer/getFileURLByName/GetFileURLByNameReducer";
import { starAlertError, starAlertLoading, starAlertSuccess } from "../alertHandler-thunk/alertHandler-thunk";
import { DispatchTypeByIdDepart, getEmployeesByIdDepartmentJustificationsReducer, getEmployeesByIdDepartmentReducer, resetEmployeesByIdDepartmentReducer } from "../../reducers/employee-reducer/getEmployeesByIdDepartment/getEmployeesByIdDepartmentReducer";
import { DispatchTypeByVariable, getByVariable2Reducer, getByVariableReducer, resetByVariable, resetByVariable2 } from "../../reducers/employee-reducer/getByVariable/getByVariableReducer";

export const StartDeletingEmployee = (employeeId: string): any => {//TODO: Type all variables that you use
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

    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const StartDismissEmployee = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeDismiss) => {
    dispatch(setLoading(true));
    const employee = await providerRedux.dismissByUidProvider(searchTerm);

    dispatch(dismissEmployeeReducer(employee || null));
    dispatch(setLoading(false));

  };
};

export const StartListOfEmployee = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeListEmployee) => {
    const employeeList = await providerRedux.employeeListProvider();
    dispatch(setLoading(true));
    if (Array.isArray(employeeList)) {
      dispatch(listEmployeesReducer(employeeList));
    }
    dispatch(setLoading(false));
  };
};

export const StartCreateEmployee = (searchTerm: EmployeesType): any => {//TODO: Type all variables that you use
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
): any => {//TODO: Type all variables that you use
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
): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeUpdateFile) => {
    const employee = await providerRedux.uploadFileProvider(
      searchTerm,
      searchUser,
      nameFile,
      typeFile
    );

    if (employee && employee.response && !employee.response.ok) {
      dispatch(starAlertError("Error updating employee", true));
    } else {
      dispatch(starAlertSuccess("Employee updated successfully", true));
    }
    dispatch(updateFileEmployeeReducer(employee || null));
  };
};

export const StartGetEmployeeByUid = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    const employee = await providerRedux.getEmployeeByUidProvider(searchTerm);

    dispatch(getEmployeeByUidReducer(employee || null));
  };
};

export const ResetEmployeeByUid = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    dispatch(resetEmployeeByUid());
  };
};

export const StartGetEmployeeByUid2 = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    const employee = await providerRedux.getEmployeeByUidProvider(searchTerm);

    dispatch(getEmployeeByUid2Reducer(employee || null));
  };
};

export const ResetEmployeeByUid3 = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    dispatch(resetEmployeeByUid3());
  };
};

export const StartGetEmployeeByUid3 = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    const employee = await providerRedux.getEmployeeByUidProvider(searchTerm);

    dispatch(getEmployeeByUid3Reducer(employee || null));
  };
};

export const ResetEmployeeByUid2 = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeEmployeeByUid) => {
    dispatch(resetEmployeeByUid2());
  };
};


export const StartResetUrl = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeGetFileURLByName) => {
    dispatch(resetUrlReducer());
  };
};

export const StartLogin = (searchTerm1: string, searchTerm2: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeLogin) => {
    dispatch(starAlertLoading("Loading", true));
    const response = await providerRedux.loginProvider(
      searchTerm1,
      searchTerm2
    );

    dispatch(loginReducer(response || null));

    console.log(response.idDepartment);
   
    if (response.idDepartment === '0') {
      dispatch(starAlertError("You can't enter because you don't have an apartment!", true))
    } else if(response.idDepartment !== '0') {
      dispatch(starAlertSuccess("Welcome!", true))
    }
    else{
      dispatch(starAlertError("Password or user incorrect", true))
    }
    dispatch(starAlertLoading("Loaded", false));

  };
};

export const StartGetByVariable = (
  searchTerm1: string,
  searchTerm2: string,
  searchTerm3: string
): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByVariable) => {
    const response = await providerRedux.getByVariableProvider(
      searchTerm1,
      searchTerm2,
      searchTerm3
    );

    dispatch(getByVariableReducer(response || null));
  };
};

export const StartGetByVariable2 = (
  searchTerm1: string,
  searchTerm2: string,
  searchTerm3: string
): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByVariable) => {
    const response = await providerRedux.getByVariableProvider(
      searchTerm1,
      searchTerm2,
      searchTerm3
    );

    dispatch(getByVariable2Reducer(response || null));
  };
};

export const StartGetByVariableAdmin = (
  searchTerm1: string,
  searchTerm2: string
): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByVariableAdmin) => {
    const response = await providerRedux.getByVariableProviderAdmin(
      searchTerm1,
      searchTerm2
    );

    dispatch(getByVariableAdminReducer(response || null));
  };
};

export const ResetByVariableAdmin = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByVariableAdmin) => {
    dispatch(resetByVariableAdmin());
  };
};

export const ResetByVariable = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByVariable) => {
    dispatch(resetByVariable());
  };
};

export const ResetByVariable2 = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByVariable) => {
    dispatch(resetByVariable2());
  };
};

export const StarGetVacationsByUid = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeVacations) => {
    const response = await providerRedux.getVacationsByUidProvider(searchTerm);

    //dispatch(EmployeeSlice.actions.getVacationsByUidReducer(response || null));

    dispatch(getVacationsByUidReducer(response || null));
  };
};

export const StarGetEmployeesByIdDepartment = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByIdDepart) => {
    const response = await providerRedux.getEmployeesByIdDepartProvider(
      searchTerm
    );

    dispatch(getEmployeesByIdDepartmentReducer(response || null));
  };
};


export const StarGetEmployeesByIdDepartmentJustifications = (searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByIdDepart) => {
    const response = await providerRedux.getEmployeesByIdDepartProvider(
      searchTerm
    );

    dispatch(getEmployeesByIdDepartmentJustificationsReducer(response || null));
  };
};

export const StartResetEmployeesByIdDepartment = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeByIdDepart) => {
    dispatch(resetEmployeesByIdDepartmentReducer());
  };
};

export const StarGetFileURLByName = (uid: string, searchTerm: string): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeGetFileURLByName) => {
    const response = await providerRedux.getFileURLByName(uid, searchTerm);

    dispatch(getFileURLByNameReducer(response || null));
  };
};

export const StarGetAllBosses = (): any => {//TODO: Type all variables that you use
  return async (dispatch: DispatchTypeAllBoss) => {
    const response = await providerRedux.getAllBossesProvider();

    dispatch(getAllBossReducer(response || null));
  };
};
