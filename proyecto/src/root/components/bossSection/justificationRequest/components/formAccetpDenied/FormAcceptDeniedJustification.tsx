import {
  PendingRequest,
  PendingRequestJustifications,
} from "@/root/interface/employee";
import React, { useState } from "react";

interface FormAcceptDenied {
  selectedRequest: PendingRequestJustifications | undefined;
  setSelectedRequest: (
    request: PendingRequestJustifications | undefined
  ) => void;
  handleAccept: () => Promise<void>;
  handleDenied: () => Promise<void>;
}

const FormAcceptDeniedJustification = ({
  selectedRequest,
  setSelectedRequest,
  handleAccept,
  handleDenied,
}: FormAcceptDenied) => {

  const [selectedSection, setSelectedSection] = useState('section1');

  const handleSelectionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedSection(event.target.value);
  };


  return (
    <>

      <select value={selectedSection} className = "bg-darkBlue text-white font-semibold" onChange={handleSelectionChange}>
        <option value="section1">Justification of start time</option>
        <option value="section2">Justification of end time</option>
      </select>

      {selectedSection === 'section1' && (
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-3">
            <label>Start time: </label>
            <input
              type="text"
              id="dateStar"
              className="outline-none w-full md:w-auto"
              value={selectedRequest?.startTime || ""}
              readOnly
            />
          </div>
          <textarea
            className="font-semibold w-full shadow-lg rounded-sm outline-none mb-3"
            name="description"
            id="description"
            placeholder="Justifications request information"
            cols={30}
            rows={7}
            value={selectedRequest?.justificationIni || ""}
            readOnly
          ></textarea>

        </div>
      )}

      {selectedSection === 'section2' && (
        <div className="w-full justify-center flex flex-col md:w-1/2">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-3">
            <label>End time:</label>
            <input
              type="text"
              className="outline-none w-full md:w-auto"
              id="dateEnd"
              value={selectedRequest?.endTime || ""}
              readOnly
            />
          </div>
          <textarea
            className="font-semibold w-full shadow-xl rounded-md outline-none"
            name="description"
            id="description"
            placeholder="Justifications request information"
            cols={30}
            rows={7}
            value={selectedRequest?.justificationFin || ""}
            readOnly
          ></textarea>

        </div>

      )}
      <div className="flex justify-between space-x-4 w-1/2">
      <button
        className="bg-darkBlue text-white rounded py-2 px-4 w-full md:w-auto"
        onClick={handleAccept}
      >
        Accepted
      </button>
      <button
        onClick={handleDenied}
        className="bg-darkBlue text-white rounded py-2 px-4 w-full md:w-auto"
      >
        Denied
      </button>
      </div>
      
    </>
  );
};

export default FormAcceptDeniedJustification;
