import AdminPage from "@/Layout/AdminPage";
import MethodsDepartments from "@/root/components/creationDeparment/methodsDepartment/MethodsDepartments";
import { ListDepartment } from "@/root/components/listDepartment/ListDeparment";
import React from "react";

const index = () => {
  return (
    <AdminPage>
      <ListDepartment />
    </AdminPage>
  );
};

export default index;
