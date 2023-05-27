import React, { useState } from "react";
import router from "next/router";
import { Url } from "next/dist/shared/lib/router/router";

export const MenuDepartment = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleButtonClick = (route: Url) => {
    router.push(route);
  };
  return (
    <div>
      <div className="w-full ">
        <div className="flex bg-white" style={{ height: "600px" }}>
          <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                Departments{" "}
              </h2>
              <span className="text-indigo-600 text-3xl font-semibold text-gray-800 md:text-4xl">
                {" "}
                The New Company
              </span>
              <p className="mt-1 text-sm text-gray-500 md:text-base">
                In our company, we have a solid and efficient organizational
                structure. Our departments are designed to maximize
                collaboration and performance in all key areas of our business.
              </p>
              <div>
                <div className="flex justify-center lg:justify-start mt-6">
                  <button
                    className={`px-4 py-3 bg-blue text-gray-200 text-xs font-semibold rounded ${
                      selectedOption === "created-departments"
                        ? "bg-sky-500"
                        : "hover:bg-sky-500"
                    }`}
                    onClick={() =>
                      handleButtonClick(
                        "/home/AdminMain/Department/CreateDepartment"
                      )
                    }
                  >
                    Created Departments
                  </button>
                  <button
                    className={`mx-4 px-4 py-3 bg-blue text-blue-900 text-xs font-semibold rounded ${
                      selectedOption === "update-departments"
                        ? "bg-blue-500"
                        : "hover:bg-blue-500"
                    }`}
                    onClick={() =>
                      handleButtonClick(
                        "/home/AdminMain/Department/UpdateDepartment"
                      )
                    }
                  >
                    Update Departments
                  </button>
                  <button
                    className={`mx-4 px-4 py-3 bg-blue text-blue-900 text-xs font-semibold rounded ${
                      selectedOption === "assign-department"
                        ? "bg-blue-500"
                        : "hover:bg-blue-500"
                    }`}
                    onClick={() =>
                      handleButtonClick("/home/AdminMain/Department/AssignBoss")
                    }
                  >
                    Assign Boss Department
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden lg:block lg:w-1/2"
            style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}
          >
            <div
              className="h-full object-cover"
              style={{
                backgroundImage:
                  "url(https://img.freepik.com/foto-gratis/angulo-vista-rascacielos_1359-825.jpg)",
              }}
            >
              <div className="h-full bg-black opacity-25"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
