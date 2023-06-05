import { LaborRegistration } from "@/root/interface/brands";
import { tr } from "date-fns/locale";
import React from "react";
interface addCycle {
  handleSubmitCycle: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string | number;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brandData: LaborRegistration;
}
export const RegisterCycle = ({ brandData, ...props }: addCycle) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="px-3 sm:w-1/2">
        <div className="mb-5">
          <form onSubmit={props.handleSubmitCycle} className="w-full space-x-2 flex-row flex">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="bg-black text-white  h-10">Cycle registration </th>
                </tr>
              </thead>
              <tbody>
                {brandData.cycle &&
                  Object.entries(brandData.cycle).map(
                    ([date, hours], index) => (
                      <tr key={index}>
                        <td className="bg-lithBlue p-2"> Cycle : {date}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <button className="bg-darkBlue w-auto h-10">
              {" "}
              <img src="/Images/plusIcon.png" alt="add" title="add cycle" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
