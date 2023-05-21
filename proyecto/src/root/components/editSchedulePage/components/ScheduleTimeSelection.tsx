import React, { useState } from "react";
import Schedule from "../../registerEmployee/components/schedule/Schedule";
import SearchInput from "../../searchInput/SearchInput";

interface ScheduleTimeSelectionProps {
  onScheduleChange: (schedules: Schedule[]) => void;
}
interface EmployeeSelected {
  name: string;
}
const ScheduleTimeSelection: React.FC<ScheduleTimeSelectionProps> = ({ onScheduleChange }) => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { weekday: "Monday", entryTime: "", exitTime: "" },
    { weekday: "Tuesday", entryTime: "", exitTime: "" },
    { weekday: "Wednesday", entryTime: "", exitTime: "" },
    { weekday: "Thursday", entryTime: "", exitTime: "" },
    { weekday: "Friday", entryTime: "", exitTime: "" },
    { weekday: "Saturday", entryTime: "", exitTime: "" },
    { weekday: "Sunday", entryTime: "", exitTime: "" },
  ]);

  const handleTimeChange = (index: number, field: "entryTime" | "exitTime", value: string) => {
    setSchedules((prevSchedules) => {
      const updatedSchedules = [...prevSchedules];
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
      return updatedSchedules;
    });
  };

  const handleScheduleChange = () => {
    onScheduleChange(schedules);
  };

  return (
    <>
      <SearchInput labelInputSeekerOne="number"  placeholderSeekerOne="ID number" valueEnd={""}/>
      <form className="relative overflow-x-auto h-screen">
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
              <tr key={index} className="border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {schedule.weekday}
                </th>
                <td className="px-6 py-4">
                  <input
                    className="border-y-2 focus:outline-none border-blue bg-transparent text-sm zoom block"
                    type="time"
                    value={schedule.entryTime}
                    onChange={(e) => handleTimeChange(index, "entryTime", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    className="border-y-2 focus:outline-none border-blue bg-transparent text-sm zoom block"
                    type="time"
                    value={schedule.exitTime}
                    onChange={(e) => handleTimeChange(index, "exitTime", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-2">
          <button className="NormalButton" onClick={handleScheduleChange}>
            Save schedule
          </button>
        </div>
      </form>
    </>
  );
};

export default ScheduleTimeSelection;
