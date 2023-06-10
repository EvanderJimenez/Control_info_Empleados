import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import React from "react";

export default function AdminCenterMenu() {
  const router = useRouter();

  const handleButtonClick = (route: Url) => {
    router.push(route);
  };

  return (
    <>
      <div className=" print:hidden left-0 z-50 w-full h-20 bg-darkBlue bg-opacity-70">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <button
            onClick={() => handleButtonClick("/home/AdminMain/Employees")}
            type="button"
            className={
              router.pathname === "/home/AdminMain/Employees"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue bg-opacity-40"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/userIcon.png" alt="Icon of employee" />
            <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Control employees
            </span>
          </button>
          <button
          onClick={() => handleButtonClick("/home/AdminMain/Department")}
            type="button"
            className={
              router.pathname === "/home/AdminMain/Department"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue bg-opacity-40"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/Timer.png" alt="" />
            <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Edit departments
            </span>
          </button>
          <button
          onClick={() => handleButtonClick("/home/AdminMain/CreateDepartment")}
            type="button"
            className={
              router.pathname === "/home/AdminMain/CreateDepartment"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue bg-opacity-40"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/pencil.png" alt="" />
            <span className="text-sm text-white font-semibold ">
            Create departments
            </span>
          </button>
          <button
           onClick={() => handleButtonClick("/home/AdminMain/ControlBoss")}
            type="button"
            className={
              router.pathname === "/home/AdminMain/ControlBoss"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue bg-opacity-40"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/userIcon.png" alt="Image of edit" />
            <span className="text-sm text-white">
              Control bosses
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
