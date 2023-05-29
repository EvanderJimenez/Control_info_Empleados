import {
  StarGetAllBosses,
  StartGetEmployeeByUid,
  selectGetAllBosses,
} from "@/root/redux";
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

  useEffect(() => {
    dispatch(StarGetAllBosses());
  }, []);

  const handleLoadInformation = async (uid: string) => {
    dispatch(StartGetEmployeeByUid(uid));
    setClear(false);
  };

  return (
    <div className="bg-gray-100 overflow-auto h-52 p-4">
      {listBoss?.map((request: EmployeesType, index: number) => (
        <div key={index} className="mb-4 p-2 border  shadow-md rounded">
          <h3 className="text-lg font-semibold mb-2">
            Employee: {request.name}
          </h3>
          <p className="text-gray-600">Email: {request.email}</p>
          <button
            className="bg-darkBlue"
            onClick={() => handleLoadInformation(request.uid)}
          >
            Load Information
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListBoss;
