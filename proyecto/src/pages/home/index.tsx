import LoginPage from "@/Layout/LoginPage";
import MethodsDepartments from "@/root/components/creationDeparment/methodsDepartment/MethodsDepartments";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  const handleScheduleChange = (schedules: Schedule[]) => {
    console.log(schedules);
  };

  return (
    <LoginPage>
      <MethodsDepartments />
    </LoginPage>
  );
}
