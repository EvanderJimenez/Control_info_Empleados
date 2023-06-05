import React, { ChangeEvent } from 'react'

interface SelectFileProps{
    handleSave: () => Promise<void>;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSelection: () => void;
}

const SelectFile = ({handleFileUpload, handleSave,handleClearSelection }:SelectFileProps) => {
  return (
    <>
     <div className="flex flex-col">
          <div className="mb-4 justify-center flex">
            <span className="font-semibold text-center">Upload file section</span>
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileUpload}
              className='appearance-none bg-transparent  text-black py-2 px-4 rounded leading-tight focus:outline-none focus:border-darkBlue'
            />
          </div>
          <div className="mt-4 justify-between flex">
            <button
              className="bg-darkBlue text-white px-4 py-2 rounded"
              onClick={handleSave}
              title = "save choose"
            >
             {" "}
             <img src="/Images/save.png" alt="save" />
            </button>
            <button
              className="bg-darkBlue text-white px-4 py-2 rounded"
              onClick={handleClearSelection}
              title = "clean choose"
            >
              {" "}
             <img src="/Images/eraser.png" alt="eraser" />
            </button>
          </div>
        </div> 
    </>
  )
}

export default SelectFile
