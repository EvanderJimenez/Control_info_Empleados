import React, { useState } from "react";
import CenterMenu from "../menus/employeeCenterMenu/EmployeeCenterMenu";

export default function RequestVacationAndJustification() {
  const handleLateJustificationSave = () => {
    const lateJustificationInput = document.getElementById("lateJustificationInput") as HTMLInputElement;
    const lateJustification = lateJustificationInput.value;
    lateJustificationInput.value = "";
  };

  const handleVacationRequestSend = () => {
    const initialDateInput = document.getElementById("initialDateInput") as HTMLInputElement;
    const finalDateInput = document.getElementById("finalDateInput") as HTMLInputElement;
    const vacationRequestInput = document.getElementById("vacationRequestInput") as HTMLTextAreaElement;
    const initialDate = initialDateInput.value;
    const finalDate = finalDateInput.value;
    const vacationRequest = vacationRequestInput.value;
    initialDateInput.value = "";
    finalDateInput.value = "";
    vacationRequestInput.value = "";
  };

  return (
    <>
      <section className="bg-PrimaryColor">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap">
            <div className="xl:w-1/2 space-y-4 flex lg:w-1/2 flex-col md:w-full px-8 py-6  border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium mb-2">Late justification</h2>
              <input type="datetime-local" id="lateJustificationInput" />
              <textarea name="" id="justificationEmployee" placeholder="Justification" cols={29} rows={10}></textarea>
              <button className="NormalButton zoom" onClick={handleLateJustificationSave}>
                Save
              </button>
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        </div>
      </section>
    </>
  );
}
