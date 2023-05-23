import LoginPage from "@/Layout/LoginPage";
import MethodsDepartments from "@/root/components/adminDepartment/methods/MethodsDepartments";
import AdminEdit from "@/root/components/adminEdit/AdminEdit";
import RegisterBrands from "@/root/components/brands/registerBrands/RegisterBrands";
import RegisterBrand from "@/root/components/brandsClock/registerBrands/RegisterBrand";
import RegisterDepartment from "@/root/components/deparments/registerDepartment/RegisterDepartment";
import { ChangeEvent, FormEvent } from "react";

export default function index() {
  return (
    <LoginPage>
      <RegisterBrand />
    </LoginPage>
  );
}
