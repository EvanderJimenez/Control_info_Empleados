import {
  selectGetVacationsByUid,
  selectLogin,
  selectUpdateEmployee,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetVacationsByUid } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { EmployeesType, Vacations } from "@/root/types/Employee.type";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PropsListRequest {
  data: EmployeesType;
  setSendRequest: React.Dispatch<React.SetStateAction<boolean>>;
  filter: string;
}
 //TODO: This code has a nested innecesary complexity, consider split in a new useHook
const ListRequestVacations = ({
  setSendRequest,
  data,
  filter,
}: PropsListRequest) => {
  const employeesListVacations = useSelector(selectLogin);
  const employeeUpdate = useSelector(selectUpdateEmployee);
  const vacations = employeeUpdate
    ? employeeUpdate.vacations
    : employeesListVacations?.vacations;

  const dispatch = useDispatch();

  useEffect(() => {
    if (employeeUpdate) {
      dispatch(StarGetVacationsByUid(employeeUpdate.uid));
    } else {
      dispatch(StarGetVacationsByUid(employeesListVacations?.uid || ""));
    }
  }, [dispatch, employeesListVacations, data, employeeUpdate]);

  return (
    <section className="grid grid-cols-1 gap-4 max-h-screen scroll overflow-y-auto h-64">
      <div className="flex flex-col justify-center items-center">
        {vacations ? (
          <>
            {Object.entries(vacations)
              .filter(([_, value]) => value.approved === filter)
              .map(([name, vacation]) => (
                <div className="flex items-center" key={name}>
                  <div className="flex w-full">
                    <div className="relative  bg-white flex flex-row items-center m-1 transition duration-300 ease-in-out delay-150 transform shadow-2xl   md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                      <div className="m-8 space-y-4">
                        <h4 className="text-lg text-center font-semibold ">
                          <div className="flex justify-center">
                            <span>{name}</span>
                          </div>
                        </h4>
                        <section className="flex justify-center">
                          <p className="text-base text-center font-normal  text-black" title="description of request">
                            {vacations[name].description}
                            
                          </p>
                        </section>
                        <div className="flex justify-between space-x-6">
                          <div>
                            <p className="text-sm" title="date start">{vacations[name].dateStart.slice(0, vacations[name].dateStart.indexOf("T") + 1).replace("T", "📅")}</p>
                          </div>
                          <div>
                            <p className="text-sm" title="date end"> {vacations[name].dateEnd.slice(0, vacations[name].dateEnd.indexOf("T") + 1).replace("T", "📅")}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {Object.entries(vacations).filter(
              ([_, value]) => value.approved === filter
            ).length === 0 && (
                <div className="font-semibold text-yellow">
                  No found vacations request by state {filter} 🤔
                </div>
              )}
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
