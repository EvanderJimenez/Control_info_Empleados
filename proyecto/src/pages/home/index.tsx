import LoginPage from "@/Layout/LoginPage";
import ScheduleTimeSelection from "@/root/components/bossSection/editSchedulePage/ScheduleTimeSelection";
import MainForm from "@/root/components/mainForm/MainForm";
import { Schedule } from "@/root/interface/employee";

  export default function index() {
  const handleScheduleChange = (schedules: Schedule[]) => {
  };

  return (
    <LoginPage>
      <MainForm />
    </LoginPage>
  );
}
