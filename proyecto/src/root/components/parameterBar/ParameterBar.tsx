import React from "react";

export default function ParameterBar() {
  return (
    <>
      <div className="flex flex-col items-center bg-SecondaryColor">
        <p className="text-red ">Parameters for the creation of the report</p>
        <div className="flex flex-row flex-wrap justify-center bg-SecondaryColor">
          <label className="flex items-center m-2">
            <input type="radio" name="opcion" value="opcion1" className="mr-2 text-red" />
            early departures
          </label>
          <label className="flex items-center m-2">
            <input type="radio" name="opcion" value="opcion2" className="mr-2 text-red" />
            late arrivals
          </label>
          <label className="flex items-center m-2">
            <input type="radio" name="opcion" value="opcion3" className="mr-2 text-red" />
            job position
          </label>
          <label className="flex items-center m-2">
            <input type="radio" name="opcion" value="opcion4" className="mr-2 text-red" />
            Titles
          </label>
        </div>
      </div>
    </>
  );
}
