import { LoginEP } from "@/root/interface/employee";
import React from "react";
interface formLogin {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loginData: LoginEP;
  labelEmail: string;
  nameEmail: string;
  labelPass: string;
  namePass: string;
}
export const InputClock = ({
  handleInputChange,
  loginData,
  nameEmail,
  namePass,
  labelEmail,
  labelPass,
  ...props
}: formLogin) => {
  return (
    <div>
      <div className="md:w-full px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          {labelEmail}
        </label>
        <div className="mt-2.5">
          <input
            type={nameEmail}
            name={nameEmail}
            value={loginData.email}
            onChange={handleInputChange}
            id={nameEmail}
            placeholder={labelEmail}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
      </div>
      <div className="md:w-full px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          {labelPass}
        </label>
        <div className="mt-2.5">
          <input
            type={namePass}
            name={namePass}
            value={loginData.password}
            onChange={handleInputChange}
            id={namePass}
            placeholder={labelPass}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
};
