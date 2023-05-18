import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const InvoicePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => { //What is it the idea of this?
    router.push("./home/");
  }, [router]);

  return (
    <div className="bg-gray-900 w-full h-full"></div>
  );
};

export default InvoicePage;
