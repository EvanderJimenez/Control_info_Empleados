import LoginPage from "@/Layout/LoginPage";
import RegisterDepartment from "../../root/components/deparments/registerDepartment/RegisterDepartment";
import RegisterBrands from "@/root/components/brands/registerBrands/RegisterBrands";

export default function index() {
  return (
    <LoginPage>
      <RegisterBrands/>
    </LoginPage>
  );
}
