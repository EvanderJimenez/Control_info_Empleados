import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="https://unsplash.com/photos/tVy3x2Vu_z4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg1MzAyMDk5fA&force=true"
        title="Cookies policy"
        paragraph="This page uses cookies to improve your browsing experience. Cookies are small text files that are stored on your device and help us analyze how you use this website. By continuing to use this site, you are accepting our cookie policy."
      />
    </LoginPage>
  );
}
