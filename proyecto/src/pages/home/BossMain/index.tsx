import React from "react";
import BossPage from "@/Layout/BossPage";
import { MainBodyBoss } from "@/root/components/mainBodyBoss/MainBodyBoss";
import InformationPage from "@/root/components/informationPage/InformationPage";
//TODO: you should use kebab-case in the name of the routes
export default function index() {
  return (
    <BossPage>
      <InformationPage
        img="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        title="Welcome!"
        paragraph="Check your information for today"
      />
    </BossPage>
  );
}
