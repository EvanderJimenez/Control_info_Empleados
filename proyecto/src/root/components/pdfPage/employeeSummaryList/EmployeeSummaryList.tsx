import React from "react";
import UserListItem from "./userListItem/UserListItem";

export default function EmployeeSummaryList() {
  const users = [
    {
      imageSrc: "/Images/userIcon.png",
      name: "Neil Sims",
      email: "email@windster.com",
    },
    {
      imageSrc: "/Images/userIcon.png",
      name: "Bonnie Green",
      email: "email@windster.com",
    },
    {
      imageSrc: "/Images/userIcon.png",
      name: "Michael Gough",
      email: "email@windster.com",
    },
    {
      imageSrc: "/Images/userIcon.png",

      name: "Lana Byrd",
      email: "email@windster.com",
    },
    {
      imageSrc: "/Images/userIcon.png",
      name: "Thomes Lean",
      email: "email@windster.com",
    },
  ];

  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-black dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user, index) => (
            <UserListItem key={index} imageSrc={user.imageSrc} name={user.name} email={user.email} />
          ))}
        </ul>
      </div>
    </div>
  );
}
