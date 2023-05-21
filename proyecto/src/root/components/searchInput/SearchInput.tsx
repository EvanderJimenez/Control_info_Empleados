import React, { useEffect, useState } from "react";
import { SearchComponentInterface } from "../../interface/searchParameters";
import {
  StartGetByVariable,
} from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { useDispatch, useSelector } from "react-redux";

export default function SearchInput(props: SearchComponentInterface) {
  const [Value, setValue] = useState("");

  const dispatch = useDispatch();


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(StartGetByVariable(Value,props.typeList));
    }
  };

  return (
    <>
      <div className="bg-transparent flex flex-wrap">
        <div className=" flex-1 xl:w-1/2  flex flex-col lg:w-1/2  md:w-full py-1">
          <div className="relative w-full">
            <input
              type={props.labelInputSeekerOne}
              id={props.id}
              className="block p-2.5 w-full z-20 text-black text-sm rounded-l-sm rounded-r-sm  border-l-1 border  focus:ring-blue focus:border-blue "
              placeholder={props.placeholderSeekerOne}
              required
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </>
  );
}