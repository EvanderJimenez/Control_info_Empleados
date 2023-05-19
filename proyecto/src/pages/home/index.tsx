import LoginPage from "@/Layout/LoginPage";
import ListEmployee from "@/root/components/listEmployee/ListEmployee";
import MainForm from "@/root/components/mainForm/MainForm";

export default function index() {
  return (
    <LoginPage>
      <MainForm />
    </LoginPage>
  );
}
