import React from 'react'

interface InputLabelProps{
    label: string
    type: string
    name: string
    value: string | number
    id: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputLabel = (props: InputLabelProps) => {
  return (
    <div className="flex items-center justify-center p-2">
      <label className="text-PrimaryColor">{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="bg-PrimaryColor secondary-font border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red rounded-md px-3 py-2 mt-2"
        id={props.name}
      />
    </div>
  );
  
}

export default InputLabel
