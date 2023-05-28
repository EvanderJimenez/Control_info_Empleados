import InputLabel from "@/root/components/registerEmployee/components/schedule/components/inputLabel/InputLabel";
import InputFloatLabel from "@/root/components/ui/InputFloatLabel/InputFloatLabel";
import React, { useState } from "react";

const Filters = () => {

    const [name, setName] = useState("")

  return (
    <div className="flex flex-row space-x-2 mt-5 m-2">
      <InputFloatLabel type="text" value={name} onChange={(e) =>  setName(e.target.value)} id="name" labelFloat="Name" name="name"  />
      <button className="bg-red flex justify-center items-center w-auto h-auto">
        <img src="/Images/searchIcon.png" alt="" />
      </button>
    </div>
  );
};

export default Filters;
