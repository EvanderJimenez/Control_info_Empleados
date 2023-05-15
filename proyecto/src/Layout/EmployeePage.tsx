import { Foot } from "@/root/components/foot/Foot";
import { Top } from "@/root/components/top/Top";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const EmployeePage = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-900 w-full h-full">
      <Top />
      <main>{children}</main>
      <Foot />
    </div>
  );
};
export default EmployeePage;
