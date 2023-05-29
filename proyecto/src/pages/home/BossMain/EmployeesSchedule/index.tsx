import React from "react";
import BossPage from "@/Layout/BossPage";
import ScheduleTimeSelection from "@/root/components/bossSection/editSchedulePage/ScheduleTimeSelection";

function SaveInformation(){

}

export default function index() {
  return (
    <BossPage>
      <ScheduleTimeSelection onScheduleChange={SaveInformation} />
    </BossPage>
  );
}
