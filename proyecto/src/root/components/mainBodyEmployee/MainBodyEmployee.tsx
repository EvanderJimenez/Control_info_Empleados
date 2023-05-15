import React from "react";
import { EmployeePage } from "../../interface/employee";

export default function MainBodyEmployee(props: EmployeePage) {
  return (
    <>
      <section className="bg-PrimaryColor">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium  mb-1">{props.department}</h2>
            <h1 className="sm:text-3xl text-2xl font-medium mb-4 ">{props.name}</h1>
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/3 space-y-4 flex flex-col lg:w-1/2  md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl font-medium mb-2">Timestamps</h2>
              <label htmlFor="Timestamps"> Entry time:{props.entryTime}</label>
              <button className="NormalButton zoom">mark entry</button>
              <label htmlFor="Timestamps">Exit time:{props.exitTime}</label>
              <button className="NormalButton zoom">check out</button>
            </div>
            <div className="xl:w-1/3 space-y-4 flex lg:w-1/2 flex-col md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium mb-2">Late justification</h2>
              <button className="NormalButton zoom">Save</button>
              <input type="datetime-local" />
              <textarea name="" id="justificationEmployee" cols={29} rows={10}></textarea>
            </div>
            <div className="xl:w-1/3 space-y-4 flex flex-col lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl font-medium  mb-2">Vacation request</h2>
              <button className="NormalButton zoom">Send vacation request</button>
              <label htmlFor="initialDate">Initial application date</label>
              <input type="datetime-local" id="initialDate" />
              <label htmlFor="finalDate">Application end date</label>
              <input type="datetime-local" id="finalDate" />
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        </div>
      </section>
    </>
  );
}
