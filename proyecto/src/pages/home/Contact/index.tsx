import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="/Images/contactBackground.jpg"
        title="Ways to contact us"
        paragraph="Writing to our official email darvar2k@gmail.com, through our twitter account @CrHome or
        contacting our customer support line +506 6132 2217."
      />
    </LoginPage>
  );
}
