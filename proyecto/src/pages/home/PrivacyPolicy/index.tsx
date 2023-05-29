import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="https://unsplash.com/photos/fPxOowbR6ls/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cHJpdmFjeXxlc3wwfHx8fDE2ODUyNDEyOTB8MA&force=true"
        title="Privacy Polities"
        paragraph="Our company is committed to protecting your personal information and using it in accordance with applicable legal requirements."
      />
    </LoginPage>
  );
}
