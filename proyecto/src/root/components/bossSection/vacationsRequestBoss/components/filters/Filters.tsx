import InputLabel from "@/root/components/registerEmployee/components/schedule/components/inputLabel/InputLabel";
import InputFloatLabel from "@/root/components/ui/InputFloatLabel/InputFloatLabel";
import React, { useState } from "react";

const Filters = () => {

    const [name, setName] = useState("")

  return (
    <div className="flex flex-col md:flex-col ">
      <InputFloatLabel type="text" value={name} onChange={(e) =>  setName(e.target.value)} id="name" labelFloat="Name" name="name"  />
      <button className="bg-darkBlue flex justify-center items-center">
        <img src="/Images/searchIcon.png" alt="search" />
      </button>
    </div>
  );
};

export default Filters;
