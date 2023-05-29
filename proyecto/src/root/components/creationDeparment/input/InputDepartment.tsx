import React from "react";
interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputDepartment = (props: InputProps) => {
  return (
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        {props.label}
      </label>
      <div className="mt-2.5">
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-#9DB2BF rounded py-3 px-4 mb-3"
          id={props.name}
          placeholder={props.label}
        />
      </div>
    </div>
  );
};
export default InputDepartment;
