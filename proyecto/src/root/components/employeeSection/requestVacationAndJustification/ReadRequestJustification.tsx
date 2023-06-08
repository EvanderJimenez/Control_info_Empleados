import React, { useState } from "react";
import CenterMenu from "../../menus/employeeCenterMenu/EmployeeCenterMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin } from "@/root/redux";
import { toast } from "react-hot-toast";


export default function ReadRequestJustification() {
  const dispatch = useDispatch();

  const UserLogin = useSelector(selectLogin);

  const [showBy, setShowBy] = useState("waiting");

  const FilterByAccepted = () => {
    setShowBy("accept");
    if(UserLogin.attendance && Object.entries(UserLogin.attendance).filter(([_, value]) => value.state === "accepted").length === 0){
     toast.error("No information was found on justifications filtering them by accepted")
    }
  };
  const FilterByDenied = () => {
    setShowBy("denied");
    if(UserLogin.attendance && Object.entries(UserLogin.attendance).filter(([_, value]) => value.state === "denied").length === 0){
      toast.error("No information was found on justifications filtering them by denied")
     }
  };
  const FilterByWaiting = () => {
    setShowBy("waiting");
    if(UserLogin.attendance && Object.entries(UserLogin.attendance).filter(([_, value]) => value.state === "waiting").length === 0){
      toast.error("No information was found on justifications filtering them by waiting")
     }
  };

  return (
    <>
      <div className="h-screen pb-10">
        <p className="text-center font-bold ">Information on justifications for non-compliance with schedule</p>
        <section className="flex flex-col  gap-4 pt-10 w-auto scroll overflow-y-auto h-64  ">
          <div className="flex flex-col justify-center items-center">
            {UserLogin?.attendance ? (
              <>
                {
                  <>
                   {/* //TODO: This code has a nested innecesary complexity, consider split in a new component */}
                    {Object.entries(UserLogin.attendance)
                      .filter(([_, value]) => value.state === showBy)
                      .map(([name, vacation]) => (
                        <div className="flex items-center shadow-lg " key={name}>
                          <div className="flex w-full">
                            <div className="relative flex  flex-row items-center m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                              <div className=" px-6 py-8">
                                <h4 className=" text-xl font-semibold text-neutral">
                                  <span>Day: {name}</span>
                                </h4>
                                <p className=" text-base font-semibold text-pink">state: {UserLogin.attendance[name].state}</p>
                                <p className="font-semibold">Start time: {UserLogin.attendance[name].startTime}</p>
                                <p className="font-semibold">End Time: {UserLogin.attendance[name].endTime}</p>
                                <p className="font-semibold">Justification start: {UserLogin.attendance[name].justificationIni}</p>
                                <p className="font-semibold">Justification End: {UserLogin.attendance[name].justificationFin}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {Object.entries(UserLogin.attendance).filter(([_, value]) => value.state === showBy).length === 0 && (
                      <div className="font-semibold ">
                        No found justifications for the filter {showBy}
                      </div>
                    )}
                  </>
                }
              </>
            ) : (
              <div className=" shadow-lg flex justify-center items-center">
                <h2>No Request</h2>
              </div>
            )}
          </div>
        </section>
        <section className=" flex space-x-4  pt-2  items-center justify-center">
          <button onClick={FilterByAccepted} className="bg-darkBlue">
            Accepted
          </button>
          <button onClick={FilterByDenied} className="bg-darkBlue">
            Denied
          </button>
          <button onClick={FilterByWaiting} className="bg-darkBlue">
            Waiting
          </button>
        </section>
      </div>
    </>
  );
}
