import React from "react";
import BossPage from "@/Layout/BossPage";
import { MainBodyBoss } from "@/root/components/mainBodyBoss/MainBodyBoss";
import EditEmployeeSection from "@/root/components/editEmployeeSection/EditEmployeeSection";
import PdfPage from "@/root/components/pdfPage/PdfPage";

export default function index() {
  return (
    <BossPage>
      <PdfPage/>
    </BossPage>
  );
}
