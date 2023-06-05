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


  return (
    <div className="mb-4">
      <label htmlFor="comboBox" className="block text-sm font-medium">
        {label}
      </label>
      <select
        id="comboBox"
        value={selectedOption ? selectedOption.name : ''}
        onChange={handleChange}
        className="mt-1 block w-full border-none bg-darkBlue text-white font-semibold shadow-sm  sm:text-sm"
      >
        <option value="">Select an option</option>
        {items.map((option) => (
          <option key={option.name}  className = "" value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBoxDocuments;
