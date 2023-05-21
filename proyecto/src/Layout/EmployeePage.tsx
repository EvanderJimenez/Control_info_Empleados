import CenterMenu from "@/root/components/menus/employeeCenterMenu/EmployeeCenterMenu";
import DashBoardMenu from "@/root/components/dashBoardMenu/DashBoardMenu";
import { Foot } from "@/root/components/foot/Foot";
import { Top } from "@/root/components/top/Top";
import { ReactNode } from "react";
import EmployeeCenterMenu from "@/root/components/menus/employeeCenterMenu/EmployeeCenterMenu";

type LayoutProps = {
  children: ReactNode;
};
const EmployeePage = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white w-full h-full">
      <Top />
      <EmployeeCenterMenu/>
      <main>{children}</main>
      <Foot />
    </div>
  );
};
export default EmployeePage;
