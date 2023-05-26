import React, { useEffect, useState } from 'react'
import Schedule from '../../registerEmployee/components/schedule/Schedule';
import FormScheduleEmployee from './components/FormScheduleEmployee';
import { useSelector } from 'react-redux';
import { selectLogin } from '@/root/redux/selectors/employee-selector/employee.selector';

const ReadOnlyScheduleEmployee = () => {

    const employeeSchedule = useSelector(selectLogin);

    const [schedules, setSchedules] = useState<Schedule[]>([
        { day: "Monday", startTime: "", endTime: "" },
        { day: "Tuesday", startTime: "", endTime: "" },
        { day: "Wednesday", startTime: "", endTime: "" },
        { day: "Thursday", startTime: "", endTime: "" },
        { day: "Friday", startTime: "", endTime: "" },
        { day: "Saturday", startTime: "", endTime: "" },
        { day: "Sunday", startTime: "", endTime: "" },
      ]);

      useEffect(() => {
        if (employeeSchedule?.schedule) {
          setSchedules(employeeSchedule.schedule);
        }
      }, [employeeSchedule]);

  return (
    <div>
       <FormScheduleEmployee schedules={schedules} />
        </div>
  )
}

export default ReadOnlyScheduleEmployee