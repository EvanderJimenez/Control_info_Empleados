import React from "react";
import ListEmployee from "../listEmployee/ListEmployee";

export default function RequestVacationSection() {
  return (
    <>
      <div className="overflow-y-auto p-2vh max-h-screen">
        <ListEmployee setClear={()=>{}} clear/>
      </div>
    </>
  );
}
