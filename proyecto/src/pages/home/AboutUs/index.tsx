import LoginPage from "@/Layout/LoginPage";
import InformationPage from "@/root/components/informationPage/InformationPage";

import React from "react";

export default function index() {
  return (
    <LoginPage>
      <InformationPage
        img="https://unsplash.com/photos/J59wWPn09BE/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YWJvdXQlMjB1c3xlc3wwfHx8fDE2ODUyNzYwMjN8MA&force=true"
        title="About us?"
        paragraph="We are a company that provides business administration services, for more information and to be aware of news visit our twitter @CrHome"
      />
    </LoginPage>
  );
}
