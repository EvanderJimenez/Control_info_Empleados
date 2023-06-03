import { Files } from '@/root/types/Employee.type';
import React from 'react';

interface ComboBoxProps {
  label: string;
  items: Files[];
  selectedOption: Files | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<Files | null>>;
}

const ComboBoxDocuments = ({
  label,
  items,
  selectedOption,
  setSelectedOption,
}: ComboBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFile = items.find((file) => file.name === event.target.value) || null;
    setSelectedOption(selectedFile);
  };

  console.log(items)

  return (
    <div className="mb-4">
      <label htmlFor="comboBox" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="comboBox"
        value={selectedOption ? selectedOption.name : ''}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select an option</option>
        {items.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBoxDocuments;
