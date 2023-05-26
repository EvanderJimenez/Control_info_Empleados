import { FirebaseError } from "firebase/app";
import React from "react";

interface UserListItemProps {
  name: string;
  FirstSurname: string;
  cedula: number | string;
}

const UserListItem: React.FC<UserListItemProps> = ({ name, FirstSurname, cedula }) => {
  return (
    <li className="pt-3 pb-0 w-full sm:pt-4">
      <div className="flex w-full items-center ">
        <div className="flex flex-row ">
          <p className="w-8 h-8 rounded-full text-white mr-6 print:text-black">{name}</p>
          <p className="w-8 h-8 rounded-full text-white  print:text-black">{FirstSurname}</p>
        </div>
        <div className="flex-1 flex-col flex justify-start w-full">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{cedula}</p>
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
