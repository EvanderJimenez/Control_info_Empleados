import { DepartmentType } from '@/root/types/Department.type';
import React, { useState } from 'react';

interface ComboBoxProps {
  label: string;
  items: DepartmentType[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, items,selectedOption,setSelectedOption }) => {
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="comboBox" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="comboBox"
        value={selectedOption}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select an option</option>
        {items.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
