import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

const InvoicePage: NextPage = () => {
  const router = useRouter();

  <Head>
    <title>CR Home</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>;

  useEffect(() => {
    //What is it the idea of this?
    router.push("./home/");
  }, [router]);

  return <>  <Head>
  <title>CR Home</title>
  <link rel="icon" href="/favicon.ico" />
</Head>;</>;
};

export default InvoicePage;
