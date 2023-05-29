import EmployeePage from "@/Layout/EmployeePage";
import LoginPage from "@/Layout/LoginPage";
import ScheduleTimeSelection from "@/root/components/bossSection/editSchedulePage/ScheduleTimeSelection";
import InformationPage from "@/root/components/informationPage/InformationPage";
import MainForm from "@/root/components/mainForm/MainForm";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  return (
    <EmployeePage>
      <InformationPage img="https://unsplash.com/photos/YI_9SivVt_s/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8ZW1wbG95ZWVzfGVzfDB8fHx8MTY4NTMwMjc1NHww&force=true" title="Welcome!" paragraph="Check your information for today" />
    </EmployeePage>
  );
}
