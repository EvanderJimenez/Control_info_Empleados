import React, { useState } from "react";

const AdminDepartment = () => {
  const [showInput, setShowInput] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowInput(event.target.checked);
  };

  return (
    <div className="min-height-full flex">
      <div className="hidden lg:block relative h-full flex-1">
        <img
          src="https://www.dtic.una.ac.cr/images/img-generales/rectoria-peq.jpg"
          alt="Department"
          className="h-max"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-lg:w-[100rem]">
          <div className="text-center lg:text-left">
            <img src="" alt="" className="h-12 w-auto  lg:m-0" />
          </div>

          <div className="mt-6">
            <form action="" className="space-y-1 bg-blue-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name of department
                  </label>
                  <input
                    type="text"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name department"
                  />
                </div>
                <div>
                  <label
                    htmlFor="leader"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Boss of the Department
                  </label>
                  <input
                    type="text"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Boss"
                  />
                </div>
                <div>
                  <label
                    htmlFor="idEmployee"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Identification Boss
                  </label>
                  <input
                    type="text"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Identification"
                  />
                </div>
                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Size of department
                  </label>
                  <input
                    type="text"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Employee"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location of the apartment
                  </label>
                  <input
                    type="text"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Location"
                  />
                </div>
                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Area to which it belongs
                  </label>
                  <input
                    type="text"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="level"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subDepartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department to which it belongs
                  </label>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <span>Show Input</span>
                </div>
                {showInput && (
                  <div>
                    <input
                      type="text"
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Belongs"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Department
              </button>
            </form>
            <div id="app" className="container mx-auto p-4">
              <table
                id="employee-table"
                className="min-w-full bg-white border border-gray-300"
              >
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Department</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">1</td>
                    <td className="py-2 px-4 border-b">John Doe</td>
                    <td className="py-2 px-4 border-b">IT</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-red-500 hover:text-red-700 mr-2">
                        Delete
                      </button>
                      <button className="text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">2</td>
                    <td className="py-2 px-4 border-b">Jane Smith</td>
                    <td className="py-2 px-4 border-b">HR</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-red-500 hover:text-red-700 mr-2">
                        Delete
                      </button>
                      <button className="text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form id="employee-form">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Employee
              </button>
            </form>
            <form id="documents-form" className="mt-4">
              <div className="mb-1">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Type Documents:
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-1">
                <label
                  htmlFor="documents"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Documents:
                </label>
                <input
                  type="file"
                  id="documents"
                  name="documents"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  multiple
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Documents
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDepartment;
