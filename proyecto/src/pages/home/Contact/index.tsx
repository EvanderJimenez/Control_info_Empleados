import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="https://unsplash.com/photos/5Ne6mMQtIdo/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg1MzAxNzE2fA&force=true"
        title="Ways to contact us"
        paragraph="Writing to our official email darvar2k@gmail.com, through our twitter account @CrHome or
        contacting our customer support line +506 6132 2217."
      />
    </LoginPage>
  );
}
