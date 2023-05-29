import LoginPage from "@/Layout/LoginPage";
import MethodsDepartments from "@/root/components/creationDeparment/methodsDepartment/MethodsDepartments";
import { ListDepartment } from "@/root/components/listDepartment/ListDeparment";
import MainForm from "@/root/components/mainForm/MainForm";

export default function index() {
  return (
    <LoginPage>
      <MainForm/>
    </LoginPage>
  );
}
