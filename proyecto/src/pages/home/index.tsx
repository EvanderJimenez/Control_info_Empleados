import LoginPage from "@/Layout/LoginPage";
import { BrandsEmployee } from "@/root/components/brandsClock/brandsEmployee/BrandsEmployee";
import MethodsBrands from "@/root/components/brandsClock/brandsEmployee/methodsBrands/MethodsBrands";
import { ListDepartment } from "@/root/components/listDepartment/ListDeparment";
import MainForm from "@/root/components/mainForm/MainForm";


export default function index() {
  return (
    <LoginPage>
     <MainForm/>
    </LoginPage>
  );
}
