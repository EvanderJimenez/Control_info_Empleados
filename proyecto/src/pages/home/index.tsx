import LoginPage from "@/Layout/LoginPage";
import ScheduleTimeSelection from "@/root/components/editSchedulePage/components/ScheduleTimeSelection";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  const handleScheduleChange = (schedules: Schedule[]) => {
    console.log(schedules);
  };

  return (
    <LoginPage>
      <ScheduleTimeSelection onScheduleChange={handleScheduleChange}/>
    </LoginPage>
  );
}
