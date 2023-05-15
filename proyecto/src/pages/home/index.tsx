import AdminPage from "@/Layout/AdminPage";
import LoginPage from "@/Layout/LoginPage";
import RegisterBrands from "@/root/components/brands/registerBrands/RegisterBrands";
import AdminDepartment from "@/root/components/adminDepartment/Admin";
import AdminEdit from "@/root/components/adminEdit/AdminEdit";
import BrandsClock from "@/root/components/brandsClock/BrandsClock";
import MenuNavBar from "@/root/components/menuNavBar/MenuNavBar";

export default function index() {
  return (
    <LoginPage>
      <MenuNavBar />
    </LoginPage>
  );
}
