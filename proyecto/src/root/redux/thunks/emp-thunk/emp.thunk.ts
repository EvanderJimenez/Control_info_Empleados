import { DispatchType, DeleteEmp } from "../../redurcers/emp-reducer/EmpReducer";
import { empProvider } from "../../provider/emp/emp.provider";

export const DeletingEmployee = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    try {
      const empDeleted = await empProvider(searchTerm);

      dispatch(DeleteEmp(empDeleted || null));
    } catch (error) {
      console.log(error);
    }
  };
};
