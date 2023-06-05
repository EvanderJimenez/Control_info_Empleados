import Login from "@/root/components/login/Login";
import { LoginEP } from "@/root/interface/employee";
import React from "react";
import { InputClock } from "./inputClock/InputClock";
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
          <div className=" m-4 p-10 bg-white  rounded shadow-xl  bg-opacity-80  md:my-16 lg:py-16 py-10 w-full  md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative ">
            <div className="" id="clock">
              {props.time}
            </div>
            <p className="text-base font-semibold text-darkBlue leading-normal text-center  mt-6 Size-8">
              For employees, the marking system provides an objective record of
              their attendance and hours worked,
              <br /> which can help avoid misunderstandings or disputes related
              to working time.
            </p>
            <form
              className="bg-white bg-opacity-25 flex items-center justify-center flex-col h-full w-full p-10"
              onSubmit={handleSubmit}
            >
              <InputClock
                handleInputChange={handleInputChange}
                loginData={loginData}
                labelEmail={"Email"}
                nameEmail={"email"}
                labelPass={"Password"}
                namePass={"password"}
              />

              <button
                type="submit"
                className="bg-darkBlue  text-white font-bold py-2 px-4 rounded mt-4"
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
