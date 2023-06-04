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
    <section className="grid grid-cols-1 p-4 gap-4 p-2vh max-h-screen scroll overflow-y-auto h-64">
      <div className="flex flex-col justify-center items-center">
        {vacations ? (
          <>
            {Object.entries(vacations)
              .filter(([_, value]) => value.approved === filter)
              .map(([name, vacation]) => (
                <div className="flex items-center" key={name}>
                  <div className="flex w-full">
                    <div className="relative flex flex-row items-center m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                      <div className="px-6 py-8">
                        <h4 className="text-xl font-semibold text-neutral">
                          <span>Affair: {name}</span>
                        </h4>
                        <p className="text-base font-normal text-black">
                          Description: {vacations[name].description}
                        </p>
                        <p>Date start: {vacations[name].dateStart}</p>
                        <p>Date end: {vacations[name].dateEnd}</p>
                        <p className="font-semibold text-pink">
                          State: {vacations[name].approved}
                        </p>
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
