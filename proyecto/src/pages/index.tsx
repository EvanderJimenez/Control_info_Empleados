import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import EditDepartment from "../root/components/deparments/editDeparment/EditDepartment";
import AdminDepartment from "@/root/components/adminDepartment/Admin";
import AdminEdit from "@/root/components/adminEdit/AdminEdit";

const InvoicePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("./home");
  }, [router]);

  return (
    <div className="bg-gray-900 w-full h-full">
      <AdminEdit />
    </div>
  );
};

export default InvoicePage;
