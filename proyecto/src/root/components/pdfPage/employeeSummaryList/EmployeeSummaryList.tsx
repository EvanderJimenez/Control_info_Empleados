import React from "react";
import UserListItem from "./userListItem/UserListItem";

interface User {
  name: string;
  firstSurname: string;
  email: string;
  cedula: number | string;
}

interface EmployeeSummaryListProps {
  users: User[];
  department: string | undefined;
}

export default function EmployeeSummaryList(props: EmployeeSummaryListProps) {
  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-black dark:border-gray-700">
      <div className="flex items-center flex-col justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Employees in charge of {props.department}</h5>
        <div className="flex justify-between mt-4 w-full">
          <p className="text-white w-full print:text-black">Name</p>
          <div className="justify-center w-full flex">
            <p className="text-white print:text-black">ID number:</p>
          </div>
        </div>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {props.users.map((user, index) => (
            <UserListItem key={index} name={index+1 +"." + user.name} FirstSurname={user.firstSurname} cedula={user.cedula} />
          ))}
        </ul>
      </div>
    </div>
  );
}
