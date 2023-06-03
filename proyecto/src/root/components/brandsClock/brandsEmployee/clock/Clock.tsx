import Login from "@/root/components/login/Login";
import { LoginEP } from "@/root/interface/employee";
import React from "react";
interface timeClock {
  time: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loginData: LoginEP;
}

export default function Clock({
  handleSubmit,
  handleInputChange,
  loginData,
  ...props
}: timeClock) {
  return (
    <div>
      <div className="2xl:mx-auto 2xl:container mx-4 py-16 flex flex-col items-center">
        <div className="w-full relative flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbGVhZG9zJTIwdHJhYmFqYW5kb3xlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="dining"
            className="w-full h-full absolute z-0 hidden xl:block"
          />
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbGVhZG9zJTIwdHJhYmFqYW5kb3xlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="dining"
            className="w-full h-full absolute z-0 hidden sm:block xl:hidden"
          />
          <img
            src="https://www.aristaint.com/hubfs/cq5dam.web.1280.1280%20%2835%29.jpeg"
            alt="dining"
            className="w-full h-full absolute z-0 sm:hidden"
          />
          <div className=" m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl bg-gray-800 bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
            <div className="" id="clock">
              {props.time}
            </div>
            <p className="text-base leading-normal text-center text-black mt-6 Size-8">
              For employees, the marking system provides an objective record of
              their attendance and hours worked,
              <br /> which can help avoid misunderstandings or disputes related
              to working time.
            </p>
            <form
              className="bg-white  bg-opacity-25   flex items-center justify-center flex-col h-full w-full p-10"
              onSubmit={handleSubmit}
            >
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Password
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    id="password"
                    placeholder="PassWord"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-darkBlue hover:text-black text-white font-bold py-2 px-4 rounded mt-4"
              >
                Enter to mark
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
