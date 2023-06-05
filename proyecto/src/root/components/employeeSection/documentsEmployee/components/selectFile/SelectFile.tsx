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
          <div className="mb-4">
            <span className="font-bold">File:</span>
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileUpload}
            />
          </div>
          <div className="mt-4">
            <button
              className="bg-blue text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save file
            </button>
            <button
              className="bg-darkBlue text-white px-4 py-2 rounded"
              onClick={handleClearSelection}
            >
              Clear Selection
            </button>
          </div>
        </div> 
    </>
  )
}

export default SelectFile
