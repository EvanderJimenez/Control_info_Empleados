import {
  PendingRequest,
  PendingRequestJustifications,
} from "@/root/interface/employee";
import React from "react";

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
  return (
    <>
      <section className="w-full flex flex-col justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-start">
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
          <button
            onClick={handleDenied}
            className="bg-darkBlue text-white rounded py-2 px-4 w-full md:w-auto"
          >
            Denied
          </button>
        </div>

        <div className="w-full md:w-1/2">
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
          <button
            className="bg-darkBlue text-white rounded py-2 px-4 w-full md:w-auto"
            onClick={handleAccept}
          >
            Accepted
          </button>
        </div>
      </section>
    </>
  );
};

export default FormAcceptDeniedJustification;
