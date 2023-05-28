import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="/Images/LicenseBackground.jpg"
        title="Licensing Policy"
        paragraph="Our goal is to ensure fair and appropriate use of our products and services, and to protect the intellectual property rights associated with them. By accessing and using our products and services, you agree to abide by the terms and conditions set forth in this license policy."
      />
    </LoginPage>
  );
}
