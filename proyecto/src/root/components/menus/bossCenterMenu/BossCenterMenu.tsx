import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import React from "react";

export default function BossCenterMenu() {
  const router = useRouter();

  const handleButtonClick = (route: Url) => {
    router.push(route);
  };

  return (
    <>
      <div className=" print:hidden left-0 z-50 w-full h-20 bg-darkBlue bg-opacity-70">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
          <button
            onClick={() => handleButtonClick("/home/BossMain/Employees")}
            type="button"
            className={
              router.pathname === "/home/BossMain/Employees"
                ? "inline-flex flex-col items-center justify-center px-5  bg-darkBlue"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/userIcon.png" alt="Icon of employee" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Edit employees</span>
          </button>
          <button
            onClick={() => handleButtonClick("/home/BossMain/EmployeesSchedule")}
            type="button"
            className={
              router.pathname === "/home/BossMain/EmployeesSchedule"
                ? "inline-flex flex-col items-center justify-center px-5  bg-darkBlue"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/Timer.png" alt="" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Edit schedules</span>
          </button>
          <button type="button" onClick={() => handleButtonClick("/home/BossMain/VacationRequest")} className={
            router.pathname === "/home/BossMain/VacationRequest"
              ? "inline-flex flex-col items-center justify-center px-5  bg-darkBlue"
              : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
          }>
            <img src="/Images/WhiteCalendar.png" alt="Image of edit" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Vacation request</span>
          </button>
          <button type="button" onClick={() => handleButtonClick("/home/BossMain/JustificationRequest")} className={
            router.pathname === "/home/BossMain/JustificationRequest"
              ? "inline-flex flex-col items-center justify-center px-5  bg-darkBlue"
              : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
          }>
            <img src="/Images/WhiteCalendar.png" alt="Image of edit" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Justification request</span>
          </button>
          <button onClick={() => handleButtonClick("/home/BossMain/ReportsPage")} type="button" className={
            router.pathname === "/home/BossMain/ReportsPage"
              ? "inline-flex flex-col items-center justify-center px-5  bg-darkBlue"
              : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
          }>
            <img src="/Images/pencil.png" alt="Image of edit" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Reports</span>
          </button>
        </div>
      </div>
    </>
  );
}
