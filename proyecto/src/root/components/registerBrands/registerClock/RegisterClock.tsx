import React from "react";
interface clock {
  label: string;
  type: string;
  name: string;
  value: string | number;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const RegisterClock = (props: clock) => {
  const validateFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const isValidFormat = regex.test(inputValue);

    if (isValidFormat) {
      props.onChange(event);
    }
  };
  return (
    <div className="w-full px-3 sm:w-1/2">
      <div className="mb-5">
        <label
          htmlFor="time"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          {props.label}
        </label>
        <input
          type="time"
          name={props.name}
          value={props.value}
          onChange={validateFormat}
          id={props.name}
          placeholder={props.label}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </div>
  );
};
