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
  const validateFormat = (inputValue: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(inputValue);
  };

  const handleNewHIniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (validateFormat(inputValue)) {
      setNewHIni(inputValue);
    }
  };

  const handleNewHFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (validateFormat(inputValue)) {
      setNewHFin(inputValue);
    }
  };
  return (
    <div className="flex justify-center  overflow-auto flex-wrap">
      <table className="w-full sm:ml-6 md:ml-6">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-2 px-4 bg-blue-700 text-gray-700">Date</th>
            <th className="py-2 px-4 bg-blue-700 text-gray-700">Start time</th>
            <th className="py-2 px-4 bg-blue-700 text-gray-700">End time</th>
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
                        type="time"
                        value={newHIni}
                        onChange={handleNewHIniChange}
                        className="w-full py-1 px-2 border rounded-md bg-white text-gray-700"
                      />
                    ) : (
                      hours.hIni
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {isEditing && editingIndex === index ? (
                      <input
                        type="time"
                        value={newHFin}
                        onChange={handleNewHFinChange}
                        className="w-full py-1 px-2 border rounded-md bg-white text-gray-700"
                        pattern="[0-9]{2}:[0-9]{2}"
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
                        className="mr-2 bg-blue"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="bg-darkBlue"
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
