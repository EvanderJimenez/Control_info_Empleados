import InputFloatLabel from "@/root/components/ui/InputFloatLabel/InputFloatLabel";
import { ResetByVariableAdmin, StartGetByVariable, StartGetByVariableAdmin } from "@/root/redux";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterList = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    dispatch(StartGetByVariableAdmin(name, "name"));
  };
  const handleClear = async () => {
    dispatch(ResetByVariableAdmin())
    setName("");
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <InputFloatLabel
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        labelFloat="Name"
        name="name"
      />
      <button
        className="bg-darkBlue flex justify-center items-center"
        onClick={handleSearch}
      >
        <img src="/Images/searchIcon.png" alt="search" />
      </button>
      <button
        className="bg-darkBlue flex justify-center items-center"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
};

export default FilterList;
