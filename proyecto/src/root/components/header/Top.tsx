import React from "react";

export function Top() {
  return (
    <header className="text-gray-600 w-full">
      <div className="container flex  p-5 flex-col md:flex-row items-center">
        <a className="flex font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="/la.png" alt="icono-inicio" className="m-5" />
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          <span className="ml-3 text-xl title-font">Bienvenido</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base primary-font">
          <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900 ">Second Link</a>
          <a className="mr-5 hover:text-gray-900 ">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Button
        </button>
      </div>
    </header>
  );
}
