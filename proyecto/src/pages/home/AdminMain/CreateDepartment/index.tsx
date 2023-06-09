
import AdminPage from "@/Layout/AdminPage";
import CreateDepartment from "@/root/components/adminSection/createDepartment/CreateDepartment";
import AssignDepartmentEmployee from "@/root/components/assignDepartmentEmployee/AssignDepartmentEmployee";
import React from "react";

const index = () => {
  return (
    <AdminPage>
    < CreateDepartment />
    </AdminPage>
  );
};

export default index;