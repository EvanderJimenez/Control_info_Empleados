import React from "react";
import Image from "next/image";

export function Top() {
  return (
    <div className="bg-SecondaryColor h-full w-full flex items-center justify-between">
      <div className="flex justify-center items-center flex-row p-0">
        <a href="#">
          <Image priority={false} width={100} height={100} className="p-8 rounded-t-lg" src="/WelcomeLogo.png" alt="Welcome Image" />
        </a>
        <h1 className="title-font">Bienvenido</h1>
      </div>
      <div className="flex p-1">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base primary-font">
          <a className="mr-5 hover:text-gray-900">Contáctenos</a>
          <a className="mr-5 hover:text-gray-900 ">Departamentos</a>
          <a className="mr-5 hover:text-gray-900 ">Acerca de</a>
          <a className="mr-5 hover:text-gray-900">Transparencia</a>
        </nav>
      </div>
    </div>
  );
}
