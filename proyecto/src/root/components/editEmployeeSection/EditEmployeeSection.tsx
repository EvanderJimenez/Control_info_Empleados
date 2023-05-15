import React from "react";

export default function EditEmployeeSection() {
  return (
    <>
      <form className="bg-SecondaryColor p-6">
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="Name"
              className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm  zoom block w-full p-2.5"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="IDnumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ID number
            </label>
            <input
              type="number"
              id="IDnumber"
              className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Surname
            </label>
            <input
              type="text"
              id="Surname"
              className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="Second-surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Second surname
            </label>
            <input
              type="text"
              id="Second-surname"
              className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm  block zoom w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Job-position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Job position
            </label>
            <input
              type="text"
              id="Job-position"
              className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm block zoom w-full p-2.5"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              Phone Number
            </label>
            <input
              type="number"
              id="PhoneNumber"
              className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Salary
            </label>
            <input
              type="number"
              id="Salary"
              className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full "
              required
            />
          </div>
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <button className="EliminatedButton  hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Fire employee
            </button>
          </div>
          <div className="flex flex-col flex-1">
            <button
              type="submit"
              className="NormalButton hover:bg-white hover:text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
          <div className="flex flex-col flex-1">
            <button className="NormalButton hover:bg-white hover:text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Choose file
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
