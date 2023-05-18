import { firestore,auth } from "@/dataBase/firebase/firebase";
import { Foot } from "@/root/components/foot/Foot";
import { Top } from "@/root/components/top/Top";
import { ReactNode,useEffect,useState } from "react";
import 'firebase/auth'; //You must not use this here

type LayoutProps = {
  children: ReactNode;
};
const AdminPage = ({ children }: LayoutProps) => {

  return (
    <div className="bg-gray-900 w-full h-full">
      <Top />
      <main>{children}</main>
      <Foot />
    </div>
  );
};
export default AdminPage;
