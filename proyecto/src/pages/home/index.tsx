import LoginPage from "@/Layout/LoginPage";
import AdminEdit from "@/root/components/adminEdit/AdminEdit";
import ListEmployee from "@/root/components/listEmployee/ListEmployee";
import MainForm from "@/root/components/mainForm/MainForm";
import Register from "@/root/components/registerEmployee/Register";
import Schedule from "@/root/components/registerEmployee/components/schedule/Schedule";


export default function index() {
  return (
    <LoginPage>
    <Register/>
    </LoginPage>
  );
}
