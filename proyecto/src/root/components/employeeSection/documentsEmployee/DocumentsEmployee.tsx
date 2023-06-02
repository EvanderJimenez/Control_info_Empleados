import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartUpDateFileEmployee, selectGetFileURLByName, selectLogin } from "@/root/redux";
import { Files } from "@/root/types/Employee.type";
import ComboBoxDocuments from "./components/comboBoxDocuments/ComboBoxDocuments";

const DocumentsEmployee: React.FC = () => {
  const userLogin = useSelector(selectLogin);
  const fileLoad = useSelector(selectGetFileURLByName);
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [nameFile, setNameFile] = useState("");
  const [selectOption, setSelectOption] = useState<Files | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setSelectOption(null);
      } else {
        setFile(null);
        setSelectOption({
          name: selectedFile.name,
          urlFile: "",
          type: selectedFile.type,
        });
      }
    }
  };

  const handleSave = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || "";
        const fileType = file.type.startsWith("image/") ? "image" : "pdf";
        dispatch(StartUpDateFileEmployee(base64String, userLogin.uid, nameFile, fileType));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoadFile = async () => {
    console.log(fileLoad);
  };

  const handleClearSelection = () => {
    setFile(null);
    setSelectOption(null);
  };

  const files: Files[] = userLogin.files ? Object.values(userLogin.files) : [];

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <ComboBoxDocuments
          items={files}
          label="Documents"
          selectedOption={selectOption}
          setSelectedOption={setSelectOption}
        />
        <button className="bg-darkBlue" onClick={handleLoadFile}>
          Load File
        </button>
      </div>
      <div className="border-2">
        {file ? (
          <div className="flex flex-col p-3">
            <div className="mb-4">
              <span className="font-bold">File selected:</span> {file.name}
            </div>
            <div>
              <img src={URL.createObjectURL(file)} alt="Selected File" className="w-64 h-auto" />
            </div>
            <label htmlFor="document">Name File: </label>
            <input type="text" value={nameFile} onChange={(e) => setNameFile(e.target.value)} />
          </div>
        ) : selectOption ? (
          <div className="flex flex-col p-3">
            <div className="mb-4">
              <span className="font-bold">File selected:</span> {selectOption.name}
            </div>
            <div>
              {selectOption.type.startsWith("image/") ? (
                <img src={selectOption.urlFile} alt="Selected File" className="w-64 h-auto" />
              ) : (
                <div className="flex items-center">
                  <img src="/Images/pdf.png" alt="PDF Icon" className="w-8 h-8 mr-2" />
                  <span>{selectOption.name}</span>
                </div>
              )}
            </div>
            <label htmlFor="document">Name File: </label>
            <input type="text" value={nameFile} onChange={(e) => setNameFile(e.target.value)} />
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
            <input type="file" accept=".jpg, .jpeg, .png, .pdf" onChange={handleFileUpload} />
          </div>
          <div className="mt-4">
            <button className="bg-blue text-white px-4 py-2 rounded" onClick={handleSave}>
              Save file
            </button>
            <button className="bg-pink text-white px-4 py-2 rounded" onClick={handleClearSelection}>
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsEmployee;
