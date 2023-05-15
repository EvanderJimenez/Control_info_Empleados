import { Foot } from "@/root/components/foot/Foot";
import { Top } from "@/root/components/top/Top";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const LoginPage = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-900">
      <Top />
      <main>{children}</main>
      <Foot />
    </div>
  );
};
export default LoginPage;
