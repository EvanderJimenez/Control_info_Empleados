import React from "react";
import Schedule from "../../../registerEmployee/components/schedule/Schedule";

type Field = "startTime" | "endTime";

interface PropsFormSchedule{
    schedules: Schedule[];
    setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
    handleSaveSchadule: (event: React.FormEvent<HTMLFormElement>) => void;
    handleTimeChange: (index: number, field: Field, value: string) => void;
}


const FormSchedule = ({handleSaveSchadule,handleTimeChange,schedules,setSchedules} : PropsFormSchedule) => {
  
  return (
    <>
      <form onSubmit={handleSaveSchadule} className="relative overflow-x-auto">
        <table className="w-full text-sm text-left GrayTable">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr
                key={index}
                className="border-b dark:bg-gray-800 dark:border-gray-700"
              >
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
                    onChange={(e) =>
                      handleTimeChange(index, "startTime", e.target.value)
                    }
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    className="border-y-2 focus:outline-none border-blue bg-transparent text-sm zoom block"
                    type="time"
                    value={schedule.endTime}
                    onChange={(e) =>
                      handleTimeChange(index, "endTime", e.target.value)
                      
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-2">
          <button className="NormalButton" type="submit">
            Save schedule
          </button>
        </div>
      </form>
    </>
  );
};

export default FormSchedule;
