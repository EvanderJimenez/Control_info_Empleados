import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const InvoicePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("./home/");
  }, [router]);

  return (
    <>
    </>
  );
};

export default InvoicePage;
