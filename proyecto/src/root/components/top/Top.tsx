import React from "react";
import Image from "next/image";
import router from "next/router";
import Cookies from "js-cookie";

const handleSingOff = () => {
  Cookies.remove("token");
  router.push("/");
};
const handleHelp = () => {
  Cookies.remove("token");
  router.push("/home/Help");
};
const handleContact = () => {
  Cookies.remove("token");
  router.push("/home/Contact");
};
const handleAbout = () => {
  Cookies.remove("token");
  router.push("/home/AboutUs");
};

export function Top() {
  return (
    <>
      <nav className="print:hidden bg-darkBlue">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 print:hidden">
          <a className="flex items-center print:hidden">
            <img src="/Images/WelcomeLogo.png" className="h-8 mr-3" alt="Logo" />
            <span className="title-font">CrHome</span>
          </a>
          <div className="flex text-white font-semibold items-center">
              (506) 8988-4062
           
       
          </div>
        </div>
      </nav>
      <nav className="bg-darkBlue dark:bg-gray-700 print:hidden">
        <div className="max-w-screen-xl px-4 py-3 mx-auto print:hidden">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm print:hidden">
              <li>
              <button className=" dark:text-white  print:hidden" onClick={handleAbout}>
              About us
                </button>
              </li>
              <li>
                <button className=" dark:text-white  print:hidden" onClick={handleContact}>
                  Contact
                </button>
              </li>
              <li>
                <button className=" dark:text-white  print:hidden" onClick={handleHelp}>
                  Help
                </button>
              </li>
              <li>
                <button className=" dark:text-white hover:underline print:hidden" onClick={handleSingOff}>
                  Sign off
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
