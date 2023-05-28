import { Foot } from "@/root/components/foot/Foot";
import { Top } from "@/root/components/top/Top";
import { ReactNode,useEffect,useState } from "react";
import 'firebase/auth';
import AdminCenterMenu from "@/root/components/menus/adminCenterMenu/AdminCenterMenu";

type LayoutProps = {
  children: ReactNode;
};
const AdminPage = ({ children }: LayoutProps) => {

  return (
    <div className="bg-gray-900 w-full h-full">
      <Top />
      <AdminCenterMenu />
      <main>{children}</main>
      <Foot />
    </div>
  );
};
export default AdminPage;
