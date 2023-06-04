import { LaborRegistration } from "@/root/interface/brands";
import React from "react";
interface employee {
  brandData: LaborRegistration;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormEmployee({
  brandData,
  handleSubmit,
  handleInputChange,
  ...props
}: employee) {
  return (
    <div>
      <form className="py-6 px-9" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="lName"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Id Employee
          </label>
          <input
            type="text"
            name="idEmployee"
            value={brandData.idEmployee}
            onChange={handleInputChange}
            placeholder="ID Employee"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-indigo-600 focus:shadow-md"
          />
        </div>

        <div>
          <button
            type="submit"
            className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Save Brand
          </button>
        </div>
      </form>
    </div>
  );
}
