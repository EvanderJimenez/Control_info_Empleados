import { PendingRequest } from '@/root/interface/employee';
import React from 'react'

interface FormAcceptDenied {

  selectedRequest: PendingRequest | undefined;
  setSelectedRequest: (request: PendingRequest | undefined) => void;
  handleAccept: () => Promise<void>;
  handleDenied: () => Promise<void>;
}

const FormAcceptDenied = ({ selectedRequest, setSelectedRequest, handleAccept, handleDenied }: FormAcceptDenied) => {
  return (
    <>
      <section className="w-full xl:w-3/4 flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-3 mb-3 justify-center items-center pt-3">
          <div className="font-semibold text-darkBlue">
            <label>Start date: </label>
            <input
              type="text"
              id="dateStar"
              className="outline-none w-auto"
              value={selectedRequest?.dateStart || ""}
              readOnly
            />
          </div>
          <div className="font-semibold text-darkBlue">
            <label>End date:</label>
            <input
              type="text"
              className="outline-none w-auto"
              id="dateEnd"
              value={selectedRequest?.dateEnd || ""}
              readOnly
            />
          </div>
        </div>

        <div className="justify-center">
          <textarea
            className=" border-lithBlue border-2 resize-none  shadow-lg font-semibold w-full  outline-none"
            name="description"
            id="description"
            placeholder="Vacation request information"
            cols={40}
            rows={10}
            value={selectedRequest?.description || ""}
            readOnly
          ></textarea>
          <div className="flex flex-row justify-between w-full sm:flex-row">
            <button className="bg-darkBlue" onClick={handleAccept}>
              Accepted
            </button>
            <button onClick={handleDenied} className="bg-darkBlue">
              Denied
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default FormAcceptDenied
