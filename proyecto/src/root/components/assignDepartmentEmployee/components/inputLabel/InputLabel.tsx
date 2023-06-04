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
    <label htmlFor={id} className="block text-sm font-medium ">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      className="mt-1  block w-full focus:outline-none  sm:text-sm"
      readOnly
    />
  </div>
  )
}

export default InputLabel