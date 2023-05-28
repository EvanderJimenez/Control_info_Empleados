import { Brands } from "@/root/interface/brands";
import React from "react";
interface employee {
  brandData: Brands;
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
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div>
          <button
            type="submit"
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Save Brand
          </button>
        </div>
      </form>
    </div>
  );
}
