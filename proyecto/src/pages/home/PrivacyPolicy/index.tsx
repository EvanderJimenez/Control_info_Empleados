import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="/Images/privacyBackground.jpg"
        title="Privacy Polities"
        paragraph="Our company is committed to protecting your personal information and using it in accordance with applicable legal requirements."
      />
    </LoginPage>
  );
}
