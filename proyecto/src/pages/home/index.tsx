import LoginPage from "@/Layout/LoginPage";
import { ListDepartment } from "@/root/components/listDepartment/ListDeparment";
import MainForm from "@/root/components/mainForm/MainForm";


export default function index() {
  return (
    <LoginPage>
      <MainForm/>
    </LoginPage>
  );
}
