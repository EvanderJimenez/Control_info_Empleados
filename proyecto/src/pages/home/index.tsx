import AdminPage from "@/Layout/AdminPage";
import LoginPage from "@/Layout/LoginPage";
import MethodsDepartments from "@/root/components/adminDepartment/methods/MethodsDepartments";
import AdminEdit from "@/root/components/adminEdit/AdminEdit";
import MethodsEmployee from "@/root/components/adminEdit/methodsEmployee/MethodsEmployee";
import RegisterBrands from "@/root/components/brands/registerBrands/RegisterBrands";
import Register from "@/root/components/registerEmployee/Register";
import ScrollableTable from "@/root/components/table/table";
import { ChangeEvent, FormEvent } from "react";

export default function index() {
  return (
    <LoginPage>
      <RegisterBrands />
    </LoginPage>
  );
}
