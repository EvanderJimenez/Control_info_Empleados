import EmployeePage from "@/Layout/EmployeePage";
import LoginPage from "@/Layout/LoginPage";
import ScheduleTimeSelection from "@/root/components/bossSection/editSchedulePage/ScheduleTimeSelection";
import InformationPage from "@/root/components/informationPage/InformationPage";
import MainForm from "@/root/components/mainForm/MainForm";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  return (
    <EmployeePage>
      <InformationPage img="/Images/EmployeeBackground.jpg" title="Welcome!" paragraph="Check your information for today" />
    </EmployeePage>
  );
}
