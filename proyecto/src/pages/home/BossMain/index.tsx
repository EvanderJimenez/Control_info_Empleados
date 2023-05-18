import React from "react";
import BossPage from "@/Layout/BossPage";
import { MainBodyBoss } from "@/root/components/mainBodyBoss/MainBodyBoss";
//TODO: you should use kebab-case in the name of the routes
export default function index() {
  return (
    <BossPage>
      <MainBodyBoss />
    </BossPage>
  );
}
