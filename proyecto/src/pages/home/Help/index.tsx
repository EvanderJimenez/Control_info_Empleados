import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="/Images/helpBackground.jpg"
        title="Ways we can help you"
        paragraph="Writing to our official email darvar2k@gmail.com with your problem,
        also contacting our customer support line +506 6132 2217."
      />
    </LoginPage>
  );
}
