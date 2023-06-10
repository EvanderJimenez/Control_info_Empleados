import InputLabel from "@/root/components/ui/InputLabel/InputLabel";
import InputFloatLabel from "@/root/components/ui/InputFloatLabel/InputFloatLabel";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetByVariable, ResetByVariable2, StartGetByVariable, StartGetByVariable2, selectLogin } from "@/root/redux";

const   Filters = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector(selectLogin)

  const handleSearch = async () =>{

    dispatch(StartGetByVariable2(name, "name", userLogin.idDepartment || '' ));

  }
  const handleClear = async () =>{
    dispatch(ResetByVariable2())
    setName("")
  }

  return (
    <div className="flex flex-col space-y-4 space-x-4 w-full justify-between  md:flex-row ">
      <InputFloatLabel
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        labelFloat="Name"
        name="name"
      />
      <button className="bg-darkBlue flex justify-center items-center" onClick={handleSearch}>
        <img src="/Images/searchIcon.png" alt="search" />
      </button>
      <button className="bg-darkBlue flex justify-center items-center" onClick={handleClear}>
        {" "}
        <img src="/Images/eraser.png" alt="eraser" />
      </button>
    </div>
  );
};

export default Filters;
