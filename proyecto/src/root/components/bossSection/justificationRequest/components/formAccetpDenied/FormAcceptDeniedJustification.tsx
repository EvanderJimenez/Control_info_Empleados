import { PendingRequestJustifications } from "@/root/interface/employee";
import React, { useState } from "react";
import ViewInfo from "../viewInfo/ViewInfo";

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
  handleAccept,
  handleDenied,
}: FormAcceptDenied) => {
  const [selectedSection, setSelectedSection] = useState("section1");

  const handleSelectionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedSection(event.target.value);
  };

  return (
    <>
      <select
        value={selectedSection}
        className="bg-darkBlue text-white font-semibold"
        onChange={handleSelectionChange}
      >
        <option value="section1">Justification of start time</option>
        <option value="section2">Justification of end time</option>
      </select>
      {/* //TODO: This code has a nested unnecessary complexity, consider split in a new component */}
      {selectedSection === "section1" && (
        <>
          <ViewInfo
            id="dateStart"
            labelInfo="Start time:"
            selectedRequest={selectedRequest}
            typeInfo="start"
          />
        </>
      )}
      {/* //TODO: This code has a nested unnecessary complexity, consider split in a new component */}
      {selectedSection === "section2" && (
        <>
          <ViewInfo
            id="dateEnd"
            labelInfo="End time:"
            selectedRequest={selectedRequest}
            typeInfo="end"
          />
        </>
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
