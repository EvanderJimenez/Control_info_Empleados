import { Files } from '@/root/types/Employee.type';
import React from 'react'

interface ShowProps {
  selectOption: Files | null;
  nameFile: string;
  setNameFile: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  handleDownload: () => Promise<void>;
  handleDelete: () => Promise<void>;

}

const ShowFile = ({ selectOption, nameFile, setNameFile, file, handleDelete, handleDownload }: ShowProps) => {
  return (
    <>

      <div className="shadow-sm  bg-lithBlue bg-opacity-50 min-h-min max-h-80 overflow-auto">
        {selectOption ? (
          <div className="flex flex-col p-3">
            <div className="mb-4">
              <span className="font-bold">File selected:</span>{" "}
              {selectOption.name}
            </div>
            <div>
              {selectOption.type.startsWith("image") ? (
                <img
                  src={selectOption.urlFile}
                  alt="Selected File"
                  className="w-64 h-auto"
                />
              ) : (
                <div className="flex items-center">
                  <img
                    src="/Images/pdf.png"
                    alt="PDF Icon"
                    className="w-8 h-8 mr-2"
                  />
                  <span>{selectOption.name}</span>
                </div>
              )}
            </div>
            <label htmlFor="document" className='font-semibold'>Name file: </label>
            <input
              type="text"
              value={nameFile}
              onChange={(e) => setNameFile(e.target.value)}
            />
            <div className='flex flex-row justify-between pt-4'>
              <button className="bg-darkBlue font-semibold" onClick={handleDownload}>
                Download
              </button>
              <button className="bg-darkBlue font-semibold" onClick={handleDelete}>
                Delete
              </button>
            </div>

          </div>
        ) : file ? (
          <div className="flex flex-col p-3">
            <div className="mb-4">
              <span className="font-bold">File selected:</span> {file.name}
            </div>
            <div>
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected File"
                  className="w-64 h-auto"
                />
              ) : (
                <div className="flex items-center">
                  <img
                    src="/Images/pdf.png"
                    alt="PDF Icon"
                    className="w-8 h-8 mr-2"
                  />
                  <span>{file.name}</span>
                </div>
              )}
            </div>
            <label htmlFor="document">Name file: </label>
            <input
              type="text"
              value={nameFile}
              onChange={(e) => setNameFile(e.target.value)}
              className='font-semibold '
            />
          </div>
        ) : (
          <span>No select file.</span>
        )}
      </div>
    </>
  )
}

export default ShowFile
