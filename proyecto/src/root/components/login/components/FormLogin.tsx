import React from "react";
import { LoginEP, UserData } from "../../../interface/employee/";//TODO:You should use relative paths with @

interface FormLoginProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loginData: LoginEP;
}

const FormLogin = ({ handleSubmit, handleInputChange, loginData }: FormLoginProps) => {
  return (
    <div>
      <form className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10" onSubmit={handleSubmit}>
        <h2 className="m-7">Login</h2>
        <div className="flex flex-col items-center justify-center p-2">
          <label>Email</label>
          <input
            type="email"
            className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <label>Password</label>
          <input
            type="password"
            className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue hover:bg-red text-white font-bold py-2 px-4 rounded mt-4">
          Log in
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
