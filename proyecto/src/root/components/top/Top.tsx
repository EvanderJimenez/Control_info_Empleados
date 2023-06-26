import React, { useReducer } from "react";
import Image from "next/image";
import router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/root/redux/reducers/login-reducer/loginReducer";
import { selectLogin } from "@/root/redux";


export function Top() {


  const dispatch = useDispatch()
  const selector = useSelector(selectLogin)

  const router = useRouter();

  const handleContact = () => {
    Cookies.remove("token");
    router.push("/home/Contact");
  };
  const handleAbout = () => {
    Cookies.remove("token");
    router.push("/home/AboutUs");
  };
  const handleLogin = () => {
    Cookies.remove("token");
    router.replace("/");
    router.reload();
  };


  return (
    <>
      <nav className="print:hidden bg-darkBlue">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 print:hidden">
          <div className="flex items-center print:hidden">
            <img src="/Images/WelcomeLogo.png" className="h-8 mr-3" alt="Logo" />
            <span className="title-font">CrHome</span>
          </div>
          <div className="flex  font-semibold items-center text-sm text-lithGray">(506) 8988-4062</div>
        </div>
      </nav>
      <nav className="bg-darkBlue dark:bg-gray-700 print:hidden">
        <div className="max-w-screen-xl px-4 py-3 mx-auto print:hidden">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-4 text-sm print:hidden">
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
                <button className=" dark:text-white hover:bg-transparent print:hidden" onClick={handleLogin}>Log in</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
