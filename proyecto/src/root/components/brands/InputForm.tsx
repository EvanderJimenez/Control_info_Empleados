import React from 'react'

interface InputFormProps{
    label: string
    type: string
    name: string
    value: string | number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputForm = (props: InputFormProps) => {
  return (
    <div>
        <div className="flex flex-col flex-1">
            <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {props.label}
            </label>
            <input onChange={props.onChange} name={props.name} type={props.type} value ={props.value} id="Name" className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm  zoom block w-full p-2.5" required />
        </div>
    </div>
  )
}

export default InputForm
