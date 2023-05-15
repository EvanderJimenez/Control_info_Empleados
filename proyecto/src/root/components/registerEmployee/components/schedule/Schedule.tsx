import React, { useState, useEffect } from "react";
import { Schedule } from "../../../../interface/employee/";
import InputLabel from "./components/inputLabel/InputLabel";

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

  useEffect(() => {
    if (schedule.length > 0) {
      setMondayStart(schedule[0].startTime);
      setMondayEnd(schedule[0].endTime);
      setTuesdayStart(schedule[1].startTime);
      setTuesdayEnd(schedule[1].endTime);
      setWednesdayStart(schedule[2].startTime);
      setWednesdayEnd(schedule[2].endTime);
      setThursdayStart(schedule[3].startTime);
      setThursdayEnd(schedule[3].endTime);
      setFridayStart(schedule[4].startTime);
      setFridayEnd(schedule[4].endTime);
      setSaturdayStart(schedule[5].startTime);
      setSaturdayEnd(schedule[5].endTime);
      setSundayStart(schedule[6].startTime);
      setSundayEnd(schedule[6].endTime);
    }
  }, [schedule]);

  const handleScheduleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      <h2 className="text-xl font-semibold mb-4">Shedule</h2>
      <form onSubmit={handleScheduleSubmit}>
        <InputLabel label="Monday" valueStart={mondayStart} valueEnd={mondayEnd} onChangeStart={(e) => setMondayStart(e.target.value)} onChangeEnd={(e) => setFridayEnd(e.target.value)} />

        <InputLabel label="Tuesday" valueStart={tuesdayStart} valueEnd={tuesdayEnd} onChangeStart={(e) => setTuesdayStart(e.target.value)} onChangeEnd={(e) => setTuesdayEnd(e.target.value)} />

        <InputLabel
          label="Wednesday"
          valueStart={wednesdayStart}
          valueEnd={wednesdayEnd}
          onChangeStart={(e) => setWednesdayStart(e.target.value)}
          onChangeEnd={(e) => setWednesdayEnd(e.target.value)}
        />

        <InputLabel label="Thursday" valueStart={thursdayStart} valueEnd={thursdayEnd} onChangeStart={(e) => setThursdayStart(e.target.value)} onChangeEnd={(e) => setThursdayEnd(e.target.value)} />

        <InputLabel label="Friday" valueStart={fridayStart} valueEnd={fridayEnd} onChangeStart={(e) => setFridayStart(e.target.value)} onChangeEnd={(e) => setFridayEnd(e.target.value)} />

        <InputLabel label="Saturday" valueStart={saturdayStart} valueEnd={saturdayEnd} onChangeStart={(e) => setSaturdayStart(e.target.value)} onChangeEnd={(e) => setSaturdayEnd(e.target.value)} />

        <InputLabel label="Sunday" valueStart={sundayStart} valueEnd={sundayEnd} onChangeStart={(e) => setSundayEnd(e.target.value)} onChangeEnd={(e) => setSaturdayEnd(e.target.value)} />

        <button type="submit" className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save schedule{" "}
        </button>
      </form>
    </div>
  );
};

export default Schedule;
