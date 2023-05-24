import React from "react";
import CenterMenu from "../menus/employeeCenterMenu/EmployeeCenterMenu";

export function Foot() {
  return (
    <>
    
    <footer className="bg-darkBlue shadow fixed bottom-0 w-full h-10 print:hidden">
      <div className="w-full h-full  max-w-screen-xl pt-4 pb-4 md:flex md:items-center md:justify-between ml-2">
        <span className="text-sm font-medium text-white sm:text-center dark:text-gray-400">. All Rights Reserved.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white  sm:mt-0">
          <li>
            <a href="/home/PrivacyPolicy" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/home/License" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="/home/CookiesInformation" className="hover:underline">
              Cookie policies
            </a>
          </li>
        </ul>
      </div>
    </footer>
    </>
    
  );
}
