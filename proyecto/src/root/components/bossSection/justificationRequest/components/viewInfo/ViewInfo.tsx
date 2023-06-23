import { PendingRequestJustifications } from "@/root/interface/employee";
import React from "react";

interface ViewInfo{
    selectedRequest: PendingRequestJustifications | undefined;
    id:string
    labelInfo:string
    typeInfo:string
}

const ViewInfo = ({...props}:ViewInfo) => {
  return (
    <>
      <div className="w-full justify-center flex flex-col md:w-1/2">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-3">
          <label>{props.labelInfo}</label>
          <input
            type="text"
            className="outline-none w-full md:w-auto"
            id={props.id}
            value={props.typeInfo === "end" ? props.selectedRequest?.endTime : props.selectedRequest?.startTime || ""}
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
          value={props.typeInfo === "end" ? props.selectedRequest?.justificationFin : props.selectedRequest?.justificationIni || ""}
          readOnly
        ></textarea>
      </div>
    </>
  );
};

export default ViewInfo;
