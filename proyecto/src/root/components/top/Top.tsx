import React from "react";
import Image from "next/image";
import router from "next/router";




export function Top() {
  return (
    <>
      <nav className="bg-SecondaryColor border-gray-200 dark:bg-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center">
            <img src="/Images/WelcomeLogo.png" className="h-8 mr-3" alt="Logo" />
            <span className="title-font">CrHome</span>
          </a>
          <div className="flex items-center">
            <a href="tel:89884062" className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">
              (506) 8988-4062
            </a>
            <a href="/" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
              Login
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-SecondaryColor dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a href="/home/AboutUs" className="text-gray-900 dark:text-white hover:underline" aria-current="page">
                  About us
                </a>
              </li>
              <li>
                <a href="/home/Contact" className="text-gray-900 dark:text-white hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/home/Help" className="text-gray-900 dark:text-white hover:underline">
                  Help
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-900 dark:text-white hover:underline">
                  Sign off
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
