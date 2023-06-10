import React from "react";
interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputDepartment = ({ onChange, ...props }: InputProps) => {
  return (
    <div className="md:w-full m-2">
      <label
        htmlFor={props.name}
        className="text-sm font-bold mb-2"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={onChange}
        id={props.name}
       
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
      />
    </div>
  );
};
export default InputDepartment;
