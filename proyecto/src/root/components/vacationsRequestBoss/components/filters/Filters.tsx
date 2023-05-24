import InputLabel from "@/root/components/registerEmployee/components/schedule/components/inputLabel/InputLabel";
import React, { useState } from "react";

const Filters = () => {

    const [name, setName] = useState("")

  return (
    <div className="flex flex-col m-2">
      <div className="m-1">
      <label className="mr-2">Name: </label>
      <input type="text" value={name} className="mr-2" onChange={(e) =>  setName(e.target.value)}/>
      </div>
      <div className="">
      <button className="bg-red flex justify-center w-60">
        {" "}
        <img src="/Images/searchIcon.png" alt="" />

      </button>
      </div>
    </div>
  );
};

export default Filters;
