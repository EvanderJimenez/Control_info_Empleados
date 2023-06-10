import {
  StarGetAllBosses,
  StartGetEmployeeByUid,
  selectGetAllBosses,
  selectLoadDataBoss,
} from "@/root/redux";
import { StartLoadDataBoss } from "@/root/redux/thunks/loadData.thunk.ts/loadData";
import { EmployeesType } from "@/root/types/Employee.type";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ListClear {
  clear: boolean;
  setClear: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListBoss = ({ clear, setClear }: ListClear) => {
  const dispatch = useDispatch();
  const listBoss = useSelector(selectGetAllBosses);

  const loadDataBoss = useSelector(selectLoadDataBoss)

  useEffect(() => {
   
    if(listBoss.length === 0 || loadDataBoss ) {
      dispatch(StarGetAllBosses());
      console.log(listBoss)
      dispatch(StartLoadDataBoss(false));
    }
    console.log(listBoss)
  }, [clear]);
 
  const handleLoadInformation = async (uid: string) => {
    dispatch(StartGetEmployeeByUid(uid));
    setClear(false);
  };

  return (
    <>
    
    <div className="shadow-xl w-auto  overflow-auto h-72 p-4">
      {listBoss?.map((request: EmployeesType, index: number) => (
        <div key={index} className="mb-4 p-2 bg-lithBlue bg-opacity-60 space-y-2  w-auto shadow-md rounded">
          <h3 className="text-xl font-semibold text-darkBlue flex justify-center mb-2">
            {request.name}
          </h3>
          <div className="flex flex-row justify-center space-x-2" title="email of employee">
            <img src="/Images/emailBlackIcon.png" alt="" />
            <p className="font-semibold"> {request.email}</p>
          </div>
          <div className="flex flex-row justify-center space-x-2" title="cedula of employee">
            <img src="/Images/idCard.png" alt="cedula" />
            <p className="font-semibold">{request.cedula}</p>

          </div>

          <div className="flex justify-center">
            <button
              className="bg-darkBlue"
              onClick={() => handleLoadInformation(request.uid)}
              title="load information for edit"
            >
              
              Load Information
            </button>
          </div>

        </div>
      ))}
    </div>
    </>
  );
};

export default ListBoss;
