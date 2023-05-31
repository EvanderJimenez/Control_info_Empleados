import { StartUpDateFileEmployee, selectLogin } from "@/root/redux";
import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const DocumentsEmployee: React.FC = () => {
  const userLogin = useSelector(selectLogin);
  const dispatch = useDispatch();

  const [fileBase64, setFileBase64] = useState<string>("");

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || "";
        setFileBase64(base64String);
      };
      reader.readAsDataURL(fileList[0]);
    }
  };

  const handleSave = async () => {
    if (fileBase64 !== "") {
      //console.log("base64", fileBase64);
      await dispatch(StartUpDateFileEmployee(fileBase64, userLogin.uid));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <ComboBoxDocuments />
      </div>
      <div>
        {fileBase64 ? (
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="font-bold">File selected:</span> {fileBase64.substring(0, 20)}...
            </div>
            <div>
              {fileBase64.startsWith("data:image/") ? (
                <img
                  src={fileBase64}
                  alt="Selected File"
                  className="w-64 h-auto"
                />
              ) : (
                <span>Error rendering File.</span>
              )}
            </div>
          </div>
        ) : (
          <span>No select file.</span>
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="font-bold">File:</span>
          </div>
          <div className="mt-4">
            <input type="file" onChange={handleFileUpload} />
          </div>
          <div className="mt-4">
            <button className="bg-blue text-white px-4 py-2 rounded" onClick={handleSave}>
              Save file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComboBoxDocuments: React.FC = () => {
  return (
    <div>
      <h2>List Files</h2>
    </div>
  );
};

export default DocumentsEmployee;
