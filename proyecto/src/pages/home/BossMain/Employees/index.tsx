import React from "react";
import BossPage from "@/Layout/BossPage";
import { MainBodyBoss } from "@/root/components/mainBodyBoss/MainBodyBoss";
import EditEmployeeSection from "@/root/components/bossSection/editEmployeeSection/EditEmployeeSection";

export default function index() {
  return (
    <BossPage>
      <EditEmployeeSection/>
    </BossPage>
  );
}
