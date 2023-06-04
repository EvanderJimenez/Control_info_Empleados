import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StarGetFileURLByName,
  StartResetUrl,
  StartUpDateEmployee,
  StartUpDateFileEmployee,
  selectGetFileURLByName,
  selectLogin,
  selectUpdateEmployee,
  selectUploadFile,
} from "@/root/redux";
import { Files } from "@/root/types/Employee.type";
import ComboBoxDocuments from "./components/comboBoxDocuments/ComboBoxDocuments";
import fetch from "node-fetch";
import fs from "fs";
import { saveAs } from "file-saver";

const DocumentsEmployee: React.FC = () => {
  const userLogin = useSelector(selectLogin);
  const fileLoad = useSelector(selectGetFileURLByName);
  const dispatch = useDispatch();
  const employeeUpdate = useSelector(selectUpdateEmployee);
  const fileUpdate = useSelector(selectUploadFile)

  const [file, setFile] = useState<File | null>(null);
  const [nameFile, setNameFile] = useState("");
  const [selectOption, setSelectOption] = useState<Files | null>(null);
  const [change, setChange] = useState(false);

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
        dispatch(
          StartUpDateFileEmployee(
            base64String,
            userLogin.uid,
            nameFile,
            fileType
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    dispatch(StarGetFileURLByName(userLogin.uid, selectOption?.urlFile || ""));
    setChange(!change);
  };


  const handleDelete = async () => {
    if (selectOption) {
      const updatedFiles = { ...userLogin.files };
      const fileToDeleteKey = Object.keys(updatedFiles).find(
        (key) => updatedFiles[key].name === selectOption.name
      );
      if (fileToDeleteKey) {
        delete updatedFiles[fileToDeleteKey];
        console.log(updatedFiles);
        await dispatch(
          StartUpDateEmployee(userLogin?.uid, {
            ...userLogin,
            files: updatedFiles,
          })
        );
      }
    }
  };

  useEffect(() => {
    console.log(fileLoad);
    if (fileLoad && selectOption) {
      const base64Data = fileLoad.replace(/^data:.*,/, "");
      const blob = b64toBlob(base64Data);
      let newFile;
      if (selectOption.type === "pdf") {
        console.log(newFile);
        newFile = new File([blob], selectOption.name + ".pdf", {
          type: "application/pdf",
        });
        //saveAs(newFile, selectOption.name);
        handleClearSelection();
        dispatch(StartResetUrl());
      } else if (selectOption.type === "image") {
        console.log(fileLoad);
        newFile = new File([blob], selectOption.name + ".png", {
          type: "image/png",
        });
        //saveAs(newFile, selectOption.name);
        handleClearSelection();
        dispatch(StartResetUrl());
      }
    }
  }, [fileLoad, change]);

  function b64toBlob(base64Data: string) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays);
  }

  const handleClearSelection = () => {
    setFile(null);
    setSelectOption(null);
  };

  const files: Files[] = employeeUpdate ? employeeUpdate.files ? Object.values(employeeUpdate.files) : userLogin.files ? Object.values(userLogin.files) : [] : [];


  //const files: Files[] = userLogin.files ? Object.values(userLogin.files) : [];
  console.log(fileUpdate);
  console.log(files)

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <ComboBoxDocuments
          items={files}
          label="Documents"
          selectedOption={selectOption}
          setSelectedOption={setSelectOption}
        />
        <button className="bg-darkBlue" onClick={handleDownload}>
          Load File
        </button>
      </div>
      <div className="border-2">
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
              )  : (
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
            <label htmlFor="document">Name File: </label>
            <input
              type="text"
              value={nameFile}
              onChange={(e) => setNameFile(e.target.value)}
            />
            <button className="bg-darkBlue" onClick={handleDownload}>
              Download
            </button>
            <button className="bg-black" onClick={handleDelete}>
              Delete
            </button>
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
            <label htmlFor="document">Name File: </label>
            <input
              type="text"
              value={nameFile}
              onChange={(e) => setNameFile(e.target.value)}
            />
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
              className="bg-pink text-white px-4 py-2 rounded"
              onClick={handleClearSelection}
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsEmployee;
