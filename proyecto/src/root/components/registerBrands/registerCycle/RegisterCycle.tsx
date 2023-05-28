import React from "react";
interface addCycle {
  handleSubmitCycle: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string | number;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const RegisterCycle = (props: addCycle) => {
  return (
    <div className="w-full px-3 sm:w-1/2">
      <div className='"mb-5"'>
        <form onSubmit={props.handleSubmitCycle} className="space-y-4">
          <label
            htmlFor="newCycle"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            {props.label}
          </label>

          <button className="hover:shadow-form rounded-md bg-[#165488] py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Add New Cycle
          </button>
        </form>
      </div>
    </div>
  );
};
