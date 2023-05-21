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
      <div className="bg-blue flex flex-wrap">
        <div className=" flex-1 xl:w-1/2 space-y-2 flex flex-col lg:w-1/2  md:w-full px-8 py-2">
          <div className="relative w-full">
            <input
              type={props.labelInputSeekerOne}
              id={props.id}
              className="block p-2.5 w-full z-20 text-blue text-sm rounded-l-lg rounded-r-lg border-l-gray-50 border-l-2 border  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600"
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