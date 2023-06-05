import React from 'react'


interface InputLabelProps{
  label: string
  valueStart: string | number
  valueEnd: string | number
  onChangeStart: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeEnd: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputLabel = (props: InputLabelProps) => {
  return (
    <div className=" p-3 m-4">
    <div className=" items-center mb-2 ">
      <label className="mr-2">{props.label}:</label>
      <input
        type="text"
        value={props.valueStart}
        onChange={props.onChangeStart}
        placeholder="Start Time"
        className="mr-2"
      />
      <input
        type="text"
        value={props.valueEnd}
        onChange={props.onChangeEnd}
        placeholder="End Time"
      />
    </div>
    </div>
  )
}

export default InputLabel