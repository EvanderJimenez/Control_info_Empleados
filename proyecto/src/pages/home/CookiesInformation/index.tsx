import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="/Images/CookiesBackground.jpg"
        title="Cookies policy"
        paragraph="This page uses cookies to improve your browsing experience. Cookies are small text files that are stored on your device and help us analyze how you use this website. By continuing to use this site, you are accepting our cookie policy."
      />
    </LoginPage>
  );
}
