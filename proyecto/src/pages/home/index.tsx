import AdminPage from "@/Layout/AdminPage";
import LoginPage from "@/Layout/LoginPage";
import RegisterBrands from "@/root/components/brands/registerBrands/RegisterBrands";
import AdminDepartment from "@/root/components/adminDepartment/Admin";
import AdminEdit from "@/root/components/adminEdit/AdminEdit";

export default function index() {
  return (
    <LoginPage>
      <AdminDepartment />
    </LoginPage>
  );
}
