import React from "react";
interface timeClock {
  time: string;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function Clock(props: timeClock) {
  return (
    <div>
      {" "}
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
            <form action="" onSubmit={props.handleUpdate}>
              <div className="sm:border border-white flex-col sm:flex-row flex items-center lg:w-5/12 w-full mt-12 space-y-4 sm:space-y-0">
                <button
                  type="submit"
                  className=" focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full  bg-blue py-4 px-6 hover:bg-opacity-75 "
                >
                  Add Mark
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
