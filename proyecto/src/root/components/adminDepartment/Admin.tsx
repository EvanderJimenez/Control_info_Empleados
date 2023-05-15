import React, { useState } from "react";

const Admin = () => {
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
          id="height"
          className="h-full"
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
              <link
                href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet"
              />
              <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="col-span-12">
                  <div className="overflow-auto lg:overflow-visible ">
                    <table className="table  text-gray-400 border-separate space-y-6 text-sm ">
                      <thead className="bg-gray-800 text-gray-500">
                        <tr>
                          <th className="p-3">Employees</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-800">
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <img
                                className="rounded-full h-12 w-12  object-cover"
                                src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                                alt="unsplash image"
                              />
                              <div className="ml-3">
                                <div className="">Appple</div>
                                <div className="text-gray-500">
                                  mail@rgmail.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 ">
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100 mr-2"
                            >
                              <i className="material-icons-outlined text-base">
                                visibility
                              </i>
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100  mx-2"
                            >
                              <i className="material-icons-outlined text-base">
                                edit
                              </i>
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100  ml-2"
                            >
                              <i className="material-icons-round text-base">
                                delete_outline
                              </i>
                            </a>
                          </td>
                        </tr>
                        <tr className="bg-gray-800">
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <img
                                className="rounded-full h-12 w-12   object-cover"
                                src="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                alt="unsplash image"
                              />
                              <div className="ml-3">
                                <div className="">Realme</div>
                                <div className="text-gray-500">
                                  mail@rgmail.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100  mr-2"
                            >
                              <i className="material-icons-outlined text-base">
                                visibility
                              </i>
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100 mx-2"
                            >
                              <i className="material-icons-outlined text-base">
                                edit
                              </i>
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100 ml-2"
                            >
                              <i className="material-icons-round text-base">
                                delete_outline
                              </i>
                            </a>
                          </td>
                        </tr>
                        <tr className="bg-gray-800">
                          <td className="p-3">
                            <div className="flex align-items-center">
                              <img
                                className="rounded-full h-12 w-12   object-cover"
                                src="https://images.unsplash.com/photo-1600856209923-34372e319a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2135&q=80"
                                alt="unsplash image"
                              />
                              <div className="ml-3">
                                <div className="">Samsung</div>
                                <div className="text-gray-500">
                                  mail@rgmail.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100 mr-2"
                            >
                              <i className="material-icons-outlined text-base">
                                visibility
                              </i>
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100 mx-2"
                            >
                              <i className="material-icons-outlined text-base">
                                edit
                              </i>
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-gray-100 ml-2"
                            >
                              <i className="material-icons-round text-base">
                                delete_outline
                              </i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
