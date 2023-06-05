import { Department } from "@/root/interface/departments";
import React, { useState } from "react";
interface getDepartment {
  handleGet: (id: string) => void;
}
export const SearchDepartment = ({ handleGet, ...props }: getDepartment) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleGet("deportes");
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50  border-gray-300 text-black text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkBlue dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
          />
          <button
            type="button"
            className="flex absolute inset-y-0 right-0 items-center pr-3"
          ></button>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-black  border border-blue-700 hover:bg-#9DB2BF focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </form>
    </div>
  );
};
