import React from 'react'

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    id: string;
  }

const InputLabel = ({ label, type, value, id } : InputFieldProps) => {
  return (
    <div className="m-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      readOnly
    />
  </div>
  )
}

export default InputLabel