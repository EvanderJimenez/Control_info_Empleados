import React from "react";
import CenterMenu from "../menus/employeeCenterMenu/EmployeeCenterMenu";
import Cookies from "js-cookie";
import router from "next/router";

const handlePrivacy = () => {
  Cookies.remove("token");
  router.push("/home/PrivacyPolicy");
};

const handleLicensing = () => {
  Cookies.remove("token");
  router.push("/home/License");
};
const handleCookies = () => {
  Cookies.remove("token");
  router.push("/home/CookiesInformation");
};

export function Foot() {
  return (
    <>
      <footer className="bg-darkBlue shadow fixed bottom-0 w-full h-10 print:hidden">
        <div className="w-full h-full  max-w-screen-xl pt-4 pb-4 md:flex md:items-center md:justify-between ml-2">
          <span className="text-sm font-medium text-white sm:text-center dark:text-gray-400">. All Rights Reserved.</span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white  sm:mt-0">
            <li>
              <button onClick={() => handlePrivacy()} className="mr-4  md:mr-6">
                Privacy Policy
              </button>
            </li>

            <li>
              <button onClick={() => handleLicensing()} className="mr-4  md:mr-6">
                Licensing
              </button>
            </li>
            <li>
              <button onClick={() => handleCookies()} className="mr-4  md:mr-6">
                Cookie policies
              </button>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
