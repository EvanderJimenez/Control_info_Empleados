import { Url } from 'next/dist/shared/lib/router/router';
import router from 'next/router';
import React from 'react'

const MenuDepartment = () => {

    const handleButtonClick = (route: Url) => {
        router.push(route);
      };

    return (
        <nav className="flex items-center justify-between bg-gray-200 p-4">
          <div className="text-lg font-bold">Menu</div>
          <ul className="flex space-x-4">
            <button onClick={() => handleButtonClick("/home/AdminMain/Department")}>
            Register Department
            </button>
            <li>
            <button onClick={() => handleButtonClick("/home/AdminMain/Department")}>
            RUpdate Department
            </button>
            </li>
            <li>
            <button onClick={() => handleButtonClick("/home/AdminMain/Department")}>
            Assign Boss
            </button>
            </li>
          </ul>
        </nav>
      );
}

export default MenuDepartment
