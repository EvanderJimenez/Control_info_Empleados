import React from "react";
import BossPage from "@/Layout/BossPage";
import ScheduleTimeSelection from "@/root/components/bossSection/editSchedulePage/ScheduleTimeSelection";
import RegisterBrand from "@/root/components/registerBrands/registerBrands/RegisterBrand";

function SaveInformation(){

}

export default function index() {
  return (
    <BossPage>
      <RegisterBrand />
    </BossPage>
  );
}
