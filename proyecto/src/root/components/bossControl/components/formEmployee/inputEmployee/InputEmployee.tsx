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
      <label className="text-sm">{props.label}</label>
      <div className="mt-2.5">
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className="block w-full p-3 mt-2  appearance-none focus:outline-none focus:shadow-inner"
          id={props.name}
         
        />
      </div>
    </div>
  );
}

export default InputEmployee;
