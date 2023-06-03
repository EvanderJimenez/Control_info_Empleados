import { LaborRegistration } from "@/root/interface/brands";
import React from "react";
interface tableShedul {
  brandData: LaborRegistration;
  newHIni: string;
  newHFin: string;
  setNewHIni: React.Dispatch<React.SetStateAction<string>>;
  setNewHFin: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  editingIndex: number;
  handleSaveClick: (index: number) => void;
  handleEditClick: (index: number) => void;
  handleDeleteSchedule: (date: string) => void;
}

const TableSchedules = ({
  brandData,
  setNewHIni,
  setNewHFin,
  newHIni,
  newHFin,
  isEditing,
  editingIndex,
  handleSaveClick,
  handleEditClick,
  handleDeleteSchedule,
}: tableShedul) => {
  return (
    <div className="p-10 pt-10 flex flex-wrap">
      <table className="w-full">
        <thead>
          <tr className="bg-[#696969]">
            <th className="py-2 px-4 bg-blue-700 text-gray-700">Date</th>
            <th className="py-2 px-4 bg-blue-700 text-gray-700">Start Time</th>
            <th className="py-2 px-4 bg-blue-700 text-gray-700">End Time</th>
            <th className="py-2 px-4 bg-blue-700 text-gray-700">Edit</th>
            <th className="py-2 px-4 bg-blue-700 text-gray-700">Delete</th>
          </tr>
        </thead>
        <tbody>
          {brandData.hoursEmployee &&
            Object.entries(brandData.hoursEmployee).map(
              ([date, hours], index) => (
                <tr key={date}>
                  <td className="py-2 px-4 border-b">{date}</td>
                  <td className="py-2 px-4 border-b">
                    {isEditing && editingIndex === index ? (
                      <input
                        type="text"
                        value={newHIni}
                        onChange={(e) => setNewHIni(e.target.value)}
                        className="w-full py-1 px-2 border rounded-md bg-white text-gray-700"
                      />
                    ) : (
                      hours.hIni
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {isEditing && editingIndex === index ? (
                      <input
                        type="text"
                        value={newHFin}
                        onChange={(e) => setNewHFin(e.target.value)}
                        className="w-full py-1 px-2 border rounded-md bg-white text-gray-700"
                      />
                    ) : (
                      hours.hFin
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {isEditing && editingIndex === index ? (
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2 bg-blue"
                        onClick={() => handleSaveClick(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2 bg-blue"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="text-red-500 hover:text-red-700 bg-red"
                      onClick={() => handleDeleteSchedule(date)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSchedules;
