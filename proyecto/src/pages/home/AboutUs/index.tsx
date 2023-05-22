import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="/Images/AboutUsBackground.jpg"
        title="About us?"
        paragraph="We are a company that provides business administration services, for more information and to be aware of news visit our twitter @CrHome"
      />
    </LoginPage>
  );
}
