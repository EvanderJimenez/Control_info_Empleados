import React, { useEffect } from "react";
import SearchInput from "../searchInput/SearchInput";
import { useSelector } from "react-redux";
import { selectGetEmployeeByCedula, selectGetEmployeeByName, selectGetEmployeeByUid, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import ListEmployee from "../listEmployee/ListEmployee";

export default function EditEmployeeSection() {

  const employeeCedula = useSelector(selectGetEmployeeByUid)
  const employeeName = useSelector(selectGetEmployeeByName)
  const user = useSelector(selectLogin)

  useEffect(() => {

  }, [])


  return (
    <div className="flex flex-col">
      <h3 className="w-full flex-none mb-3 text-2xl leading-none text-slate-900"> User: {user?.name}</h3>
    <div className="flex flex-wrap p-1">
    <div className="flex-none w-72 relative p-1 m-1">
      <div className="flex">
      <div className="flex flex-col">
      <h2>Search By: </h2>
      <SearchInput labelInputSeekerOne="text" valueEnd={""} placeholderSeekerOne="Cedula" />
      <SearchInput labelInputSeekerOne="text" valueEnd={""} placeholderSeekerOne="Name" />
      <SearchInput labelInputSeekerOne="text" valueEnd={""} placeholderSeekerOne="Job Position" />
      </div>
      <button className="bg-red"> Search</button>
      </div>

      <ListEmployee />
    </div>
    <div className="flex-auto p-1">
    <form className="bg-SecondaryColor p-6 h-screen">
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input type="text" value ={employeeCedula?.name} id="Name" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm  zoom block w-full p-2.5" required />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="IDnumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ID number
            </label>
            <input type="text" value ={employeeCedula?.cedula} id="IDnumber" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5" required />
          </div>
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Surname
            </label>
            <input type="text" value ={employeeCedula?.firstSurname} id="Surname" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5" required />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="Second-surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Second surname
            </label>
            <input type="text" value ={employeeCedula?.secondSurname} id="Second-surname" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm  block zoom w-full p-2.5" required />
          </div>
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Job-position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Job position
            </label>
            <input type="text" value ={employeeCedula?.jobPosition} id="Job-position" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm block zoom w-full p-2.5" required />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              Phone Number
            </label>
            <input type="number" value ={employeeCedula?.phoneNumber} id="PhoneNumber" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5" required />
          </div>
        </div>
        <div className="mb-6 flex flex-row space-x-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="Salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Salary
            </label>
            <input type="number" value ={employeeCedula?.salary} id="Salary" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full " required />
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
    </div>
    </div>
    </div>

  );
}
