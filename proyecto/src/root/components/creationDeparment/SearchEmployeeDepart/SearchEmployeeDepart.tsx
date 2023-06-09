import React, { useEffect, useState } from "react";
import { SearchComponentInterface } from "../../../interface/searchParameters";
import { StartGetByVariableAdmin } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin } from "@/root/redux";

export default function SearchEmployeeDepart(props: SearchComponentInterface) {
  const [Value, setValue] = useState("");

  const dispatch = useDispatch()

  const handleSearch = async () => {
    dispatch(StartGetByVariableAdmin(Value, props.typeList || ""));
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex-1 xl:w-1/2 flex flex-col lg:w-1/2 md:w-full py-1">
          <div className="relative flex flex-row w-full">
            <input
              type="text"
              id={props.id}
              className="block font-semibold p-2.5 w-full border-b focus:outline-none z-20 text-black text-sm rounded-l-sm rounded-r-sm focus:ring-darkBlue focus:border-darkBlue"
              placeholder={props.placeholderSeekerOne}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-darkBlue ml-2 flex justify-center"
            >
              <img src="/Images/searchIcon.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
