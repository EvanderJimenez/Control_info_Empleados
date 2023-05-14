import LoginPage from "@/Layout/LoginPage";
import MainForm from "@/root/components/mainForm/MainForm";
import React from "react";
import EditDepartment from "../../root/components/deparments/editDeparment/EditDepartment";
import Register from "../../root/components/deparments/updateDepartment/register";
import RegisterDepartment from "../../root/components/deparments/registerDepartment/RegisterDepartment";

export default function index() {
  return (
    <LoginPage>
      <MainForm />
    </LoginPage>
  );
}
