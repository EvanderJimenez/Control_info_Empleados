import LoginPage from "@/Layout/LoginPage";
import { BrandsClock } from "@/root/components/brandsClock/BrandsClock";
import MethodsBrands from "@/root/components/brandsClock/brandsEmployee/methodsBrands/MethodsBrands";
import { ListDepartment } from "@/root/components/listDepartment/ListDeparment";
import MainForm from "@/root/components/mainForm/MainForm";

export default function index() {
  return (
    <LoginPage>
      <MethodsBrands />
    </LoginPage>
  );
}
