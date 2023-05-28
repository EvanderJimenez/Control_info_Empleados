import { Foot } from "@/root/components/foot/Foot";
import BossCenterMenu from "@/root/components/menus/bossCenterMenu/BossCenterMenu";
import { Top } from "@/root/components/top/Top";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const BossPage = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-900 w-full h-full">
      <Top />
      <BossCenterMenu/>
      <main>{children}</main>
      <Foot />
    </div>
  );
};
export default BossPage;
