import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="https://unsplash.com/photos/Ju-ITc1Cc0w/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8aGVscHxlc3wwfHx8fDE2ODUyNjcxMzJ8MA&force=true"
        title="Ways we can help you"
        paragraph="Writing to our official email darvar2k@gmail.com with your problem,
        also contacting our customer support line +506 6132 2217."
      />
    </LoginPage>
  );
}
