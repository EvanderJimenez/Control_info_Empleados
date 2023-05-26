import { selectGetVacationsByUid, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetVacationsByUid } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListRequestVacations = () => {
  const employeesListVacations = useSelector(selectLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StarGetVacationsByUid(employeesListVacations?.uid || ""));
  }, [dispatch, employeesListVacations]);

  return (
    <section className="grid grid-cols-1 p-4 gap-4  p-2vh max-h-screen scroll overflow-y-auto h-64 border-t-4 border-b-4">
      <div className="flex flex-col justify-center items-center">
        {employeesListVacations?.vacations ? (
          <>
            {
              <>
                {Object.entries(employeesListVacations.vacations).map(([name]) => (
                  <div className="flex items-center " key={name}>
                    <div className="flex w-full">
                      <div className="relative flex  flex-row items-center m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                        <div className=" px-6 py-8">
                          <h4 className=" text-xl font-semibold text-neutral">
                            <span>Name Request: {name}</span>
                          </h4>
                          <p className=" text-base font-normal text-black">Description: {employeesListVacations.vacations[name].description}</p>
                          <p>Date Start: {employeesListVacations.vacations[name].dateStart}</p>
                          <p>Date End: {employeesListVacations.vacations[name].dateEnd}</p>
                          <p>State: {employeesListVacations.vacations[name].approved}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            }
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h2>No Request</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListRequestVacations;
