import React from "react";
import { SearchComponentInterface } from "../../interface/searchParameters";//TODO:You should use relative paths with @

export default function SearchInput(props: SearchComponentInterface) {
  return (
    <>
      <form className="bg-SecondaryColor flex flex-wrap">
        <div className=" flex-1 xl:w-1/2 space-y-2 flex flex-col lg:w-1/2  md:w-full px-8 py-6">
          <button
            className="NormalButton flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            Search
          </button>
          <div className="relative w-full">
            <input
              type={props.labelInputSeekerOne}
              id="InputSeekerOne"
              className="block p-2.5 w-full z-20 text-sm rounded-l-lg rounded-r-lg border-l-gray-50 border-l-2 border  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600"
              placeholder={props.placeholderSeekerOne}
              required
            />
          </div>
        </div>
        <div className="flex-1 xl:w-1/2 space-y-2 flex flex-col lg:w-1/2  md:w-full px-8 py-6">
          <button
            className=" NormalButton flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            Search
          </button>
          <div className="relative w-full">
            <input
              type={props.labelInputSeekerTwo}
              id="InputSeekerOne"
              className="block p-2.5 w-full z-20 text-sm rounded-r-lg rounded-l-lg border-l-2 border border-gray-300 focus:ring-blue focus:border-blue  dark:focus:border-blue"
              placeholder={props.placeholderSeekerTwo}
              required
            />
          </div>
        </div>
      </form>
    </>
  );
}
