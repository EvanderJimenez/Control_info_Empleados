import React, { useState } from "react";
import { Schedule } from "../../../../interface/employee/";

interface ScheduleFormProps {
  schedule: Schedule[];
  handleScheduleChange: (newSchedule: Schedule[]) => void;
}

const Schedule = ({ schedule, handleScheduleChange }: ScheduleFormProps) => {
  const [mondayStart, setMondayStart] = useState("");
  const [mondayEnd, setMondayEnd] = useState("");
  const [tuesdayStart, setTuesdayStart] = useState("");
  const [tuesdayEnd, setTuesdayEnd] = useState("");
  const [wednesdayStart, setWednesdayStart] = useState("");
  const [wednesdayEnd, setWednesdayEnd] = useState("");
  const [thursdayStart, setThursdayStart] = useState("");
  const [thursdayEnd, setThursdayEnd] = useState("");
  const [fridayStart, setFridayStart] = useState("");
  const [fridayEnd, setFridayEnd] = useState("");
  const [saturdayStart, setSaturdayStart] = useState("");
  const [saturdayEnd, setSaturdayEnd] = useState("");
  const [sundayStart, setSundayStart] = useState("");
  const [sundayEnd, setSundayEnd] = useState("");

  const handleScheduleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting  schedule form");
    event.preventDefault();
    console.log("Submitting schedule form");
    const newSchedule = [
      {
        day: 1,
        startTime: mondayStart,
        endTime: mondayEnd,
      },
      {
        day: 2,
        startTime: tuesdayStart,
        endTime: tuesdayEnd,
      },
      {
        day: 3,
        startTime: wednesdayStart,
        endTime: wednesdayEnd,
      },
      {
        day: 4,
        startTime: thursdayStart,
        endTime: thursdayEnd,
      },
      {
        day: 5,
        startTime: fridayStart,
        endTime: fridayEnd,
      },
      {
        day: 6,
        startTime: saturdayStart,
        endTime: saturdayEnd,
      },
      {
        day: 7,
        startTime: sundayStart,
        endTime: sundayEnd,
      },
    ];
    handleScheduleChange(newSchedule);
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Horario</h2>
      <form onSubmit={handleScheduleSubmit}>
        <div className="flex items-center mb-2">
          <label className="mr-2">Monday:</label>
          <input
            type="text"
            value={mondayStart}
            onChange={(e) => setMondayStart(e.target.value)}
            placeholder="Start Time"
            className="mr-2"
          />
          <input
            type="text"
            value={mondayEnd}
            onChange={(e) => setMondayEnd(e.target.value)}
            placeholder="End Time"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Tuesday:</label>
          <input
            type="text"
            value={tuesdayStart}
            onChange={(e) => setTuesdayStart(e.target.value)}
            placeholder="Start Time"
            className="mr-2"
          />
          <input
            type="text"
            value={tuesdayEnd}
            onChange={(e) => setTuesdayEnd(e.target.value)}
            placeholder="End Time"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Wednesday:</label>
          <input
            type="text"
            value={wednesdayStart}
            onChange={(e) => setWednesdayStart(e.target.value)}
            placeholder="Start Time"
            className="mr-2"
          />
          <input
            type="text"
            value={wednesdayEnd}
            onChange={(e) => setWednesdayEnd(e.target.value)}
            placeholder="End Time"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Thursday:</label>
          <input
            type="text"
            value={thursdayStart}
            onChange={(e) => setThursdayStart(e.target.value)}
            placeholder="Start Time"
            className="mr-2"
          />
          <input
            type="text"
            value={thursdayEnd}
            onChange={(e) => setThursdayEnd(e.target.value)}
            placeholder="End Time"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Friday:</label>
          <input
            type="text"
            value={fridayStart}
            onChange={(e) => setFridayStart(e.target.value)}
            placeholder="Start Time"
            className="mr-2"
          />
          <input
            type="text"
            value={fridayEnd}
            onChange={(e) => setFridayEnd(e.target.value)}
            placeholder="End Time"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="mr-2">Saturday:</label>
          <input
            type="text"
            value={saturdayStart}
            onChange={(e) => setSaturdayStart(e.target.value)}
            placeholder="Start Time"
            className="mr-2"
          />
          <input
            type="text"
            value={saturdayEnd}
            onChange={(e) => setSaturdayEnd(e.target.value)}
            placeholder="End Time"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Sunday:</label>
          <input
            type="text"
            value={sundayStart}
            onChange={(e) => setSundayStart(e.target.value)}
            placeholder="Start Time"
            className="mr-2"
          />
          <input
            type="text"
            value={sundayEnd}
            onChange={(e) => setSundayEnd(e.target.value)}
            placeholder="End Time"
          />
        </div>

        <button
          type="submit"
          className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save schedule{" "}
        </button>
      </form>
    </div>
  );
};

export default Schedule;
