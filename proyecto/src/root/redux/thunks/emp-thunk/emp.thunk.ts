import { DispatchType, DeleteEmp } from "../../redurcers/emp-reducer/EmpReducer";
import { empProvider } from "../../provider/emp/emp.provider";

export const startSetGif = (searchTerm: string): any => {
  return async (dispatch: DispatchType) => {
    const gifList = await gifProvider(searchTerm);

    dispatch(setGifs(gifList || []));
  };
};
