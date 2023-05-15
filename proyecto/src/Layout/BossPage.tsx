import { Foot } from "@/root/components/foot/Foot";
import { Top } from "@/root/components/header/Top";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const BossPage = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-900 w-full h-full">
      <Top />
      <main>{children}</main>
      <footer>
        <Foot/>
      </footer>
    </div>
  );
};
export default BossPage;
