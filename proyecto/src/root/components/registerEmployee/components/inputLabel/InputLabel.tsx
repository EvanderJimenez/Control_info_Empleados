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
    <div>
      <div className="flex flex-col items-center justify-center p-2">
      <label>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        // required
        value={props.value}
        onChange={props.onChange}
        className="bg-PrimaryColor secondary-font  border-2 border-gray-300 focus:outline-none focus:border-blue hover:border-red"
        id={props.name}
      />
    </div>
    </div>
  )
}

export default InputLabel
