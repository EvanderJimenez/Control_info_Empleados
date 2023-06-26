import { LoginEP } from "@/root/interface/employee";
import React from "react";


interface FormLoginProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loginData: LoginEP;
}
 


const FormLogin = ({ handleSubmit, handleInputChange, loginData }: FormLoginProps) => {
  function dispatch(arg0: any): React.MouseEventHandler<HTMLButtonElement> | undefined {//TODO: Type all variables that you use
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <form className="bg-lithBlue  flex items-center justify-center flex-col h-full w-full p-10" onSubmit={handleSubmit}>
        <h2 className="m-7  font-bold">Login</h2>
        <div className="flex flex-col items-center justify-center p-2">
          <label className="font-semibold ">Email</label>
          <input
            type="email"
            className="EspecialInput border-b focus:outline-none border-black bg-transparent text-sm  zoom block w-full p-2.5"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <label className="font-semibold " >Password</label>
          <input
            type="password"
            className="EspecialInput border-b focus:outline-none border-black bg-transparent text-sm  zoom block w-full p-2.5"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="bg-darkBlue hover:text-black text-white font-bold py-2 px-4 rounded mt-4">
          Log in
        </button>
      </form>
    </div>
  );
};

export default FormLogin;


