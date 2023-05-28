import LoginPage from "@/Layout/LoginPage";
import { BrandsEmployee } from "@/root/components/brandsClock/brandsEmployee/BrandsEmployee";
import MethodsDepartments from "@/root/components/creationDeparment/methodsDepartment/MethodsDepartments";
import MainForm from "@/root/components/mainForm/MainForm";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  return (
    <LoginPage>
      <MethodsDepartments />
    </LoginPage>
  );
}
