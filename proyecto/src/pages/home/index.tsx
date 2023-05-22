import LoginPage from "@/Layout/LoginPage";
import ScheduleTimeSelection from "@/root/components/editSchedulePage/ScheduleTimeSelection";
import MainForm from "@/root/components/mainForm/MainForm";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  const handleScheduleChange = (schedules: Schedule[]) => {
    console.log(schedules);
  };

  return (
    <LoginPage>
      <MainForm/>
    </LoginPage>
  );
}
//<ScheduleTimeSelection onScheduleChange={handleScheduleChange}/>