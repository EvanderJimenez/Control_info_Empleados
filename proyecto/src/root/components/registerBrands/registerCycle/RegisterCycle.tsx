import { Brands } from "@/root/interface/brands";
import { tr } from "date-fns/locale";
import React from "react";
interface addCycle {
  handleSubmitCycle: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string | number;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brandData: Brands;
}
export const RegisterCycle = ({ brandData, ...props }: addCycle) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="px-3 sm:w-1/2">
        <div className="mb-5">
          <form onSubmit={props.handleSubmitCycle} className="space-y-4">
            <label
              htmlFor="newCycle"
              className="mb-3 block text-base font-medium text-[#07074D]"
            ></label>

            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="border p-2">Cycle registration </th>
                </tr>
              </thead>
              <tbody>
                {brandData.cycle &&
                  Object.entries(brandData.cycle).map(
                    ([date, hours], index) => (
                      <tr key={index}>
                        <td className="border p-2"> Cycle : {date}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <button className="bg-black hover:shadow-form rounded-md bg-[#165488] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              Add New Cycle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
