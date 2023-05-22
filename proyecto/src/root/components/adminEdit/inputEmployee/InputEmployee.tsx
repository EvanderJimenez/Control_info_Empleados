import React from "react";
interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function InputEmployee(props: InputProps) {
  return (
    <div>
      <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <label className="text-sm text-gray-600">{props.label}</label>
        <div className="mt-2.5">
          <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-sky-700 leading-tight focus:outline-none focus:shadow-outline"
            id={props.name}
            placeholder={props.label}
          />
        </div>
      </div>
    </div>
  );
}

export default InputEmployee;
