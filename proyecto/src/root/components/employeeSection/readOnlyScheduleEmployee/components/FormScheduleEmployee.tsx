import { Schedule } from "@/root/interface/employee";
import { selectGetDepartmentById } from "@/root/redux";
import React from "react";
import { useSelector } from "react-redux";

type Field = "startTime" | "endTime";

interface PropsFormSchedule {
  schedules: Schedule[];
}

const handleGeneratedPdf = () => {
  window.print();
};



const FormScheduleEmployee = ({ schedules }: PropsFormSchedule) => {
  const department = useSelector(selectGetDepartmentById)
  return (
    <>
      <p className="text-center font-bold mt-2">Weekly schedule</p>
      <p className="text-center font-bold mt-2">Department: {department?.name || ''}</p>
      <form className="relative overflow-x-auto p-5 pb-14">
        <table className="w-full text-sm text-left GrayTable">
          <thead className="text-xs text-white bg-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Weekday
              </th>
              <th scope="col" className="px-6 py-3">
                Entry time
              </th>
              <th scope="col" className="px-6 py-3">
                Exit time
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={index} className=" even:bg-lithBlue odd:bg-white">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {schedule.day}
                </th>
                <td className="px-6 py-4">
                  <input
                    className="border-y-2 focus:outline-none border-blue bg-transparent text-sm zoom block"
                    type="time"
                    value={schedule.startTime}
                    readOnly
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    className="border-y-2 focus:outline-none border-blue bg-transparent text-sm zoom block"
                    type="time"
                    value={schedule.endTime}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            {Array.isArray(schedules) && schedules.length === 0 && (
              <div className="font-semibold text-yellow ">
                {" "}
                You do not have a registered schedule 🤔
              </div>
            )}
          </tbody>
        </table>
        <div className="flex print:hidden justify-center mt-2">
          <button
            onClick={handleGeneratedPdf}
            className="bg-darkBlue flex p-2 flex-row "
          >
            Generated pdf
            <img
              className="pl-2"
              src="/Images/WhiteCalendar.png"
              alt="calendar"
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default FormScheduleEmployee;
