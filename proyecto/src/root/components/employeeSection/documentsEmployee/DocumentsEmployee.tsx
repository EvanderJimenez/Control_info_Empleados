import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StarGetFileURLByName,
  StartResetUrl,
  StartUpDateEmployee,
  StartUpDateFileEmployee,
  selectGetFileURLByName,
  selectLogin,
  selectUploadFile,
} from "@/root/redux";
import { Files } from "@/root/types/Employee.type";
import ComboBoxDocuments from "./components/comboBoxDocuments/ComboBoxDocuments";
import { saveAs } from "file-saver";
import { b64toBlob } from "@/root/utils/base64/base64";
import ShowFile from "./components/showFile/ShowFile";
import SelectFile from "./components/selectFile/SelectFile";

let files: Files[] = [];

const DocumentsEmployee: React.FC = () => {
  const userLogin = useSelector(selectLogin);
  const fileLoad = useSelector(selectGetFileURLByName);
  const dispatch = useDispatch();
  const fileUpdate = useSelector(selectUploadFile);

  const [file, setFile] = useState<File | null>(null);
  const [nameFile, setNameFile] = useState("");
  const [selectOption, setSelectOption] = useState<Files | null>(null);
  const [change, setChange] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      console.log(selectedFile.type);
      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type === "application/pdf"
      ) {
        console.log(selectedFile.type);
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
        console.log(base64String);
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
      handleClearSelection();
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
    if (fileLoad && selectOption) {
      const base64Data = fileLoad.replace(/^data:.*,/, "");
      const blob = b64toBlob(base64Data);
      let newFile;
      if (selectOption.type === "pdf") {
        newFile = new File([blob], selectOption.name + ".pdf", {
          type: "application/pdf",
        });
        saveAs(newFile, selectOption.name);
        handleClearSelection();
        dispatch(StartResetUrl());
      } else if (selectOption.type === "image") {
        newFile = new File([blob], selectOption.name + ".png", {
          type: "image/png",
        });
        saveAs(newFile, selectOption.name);
        handleClearSelection();
        dispatch(StartResetUrl());
      }
    }
  }, [fileLoad, change]);

  const handleClearSelection = () => {
    setFile(null);
    setSelectOption(null);
    setNameFile("");
  };

  if (fileUpdate && fileUpdate.files) {
    files = Object.values(fileUpdate.files);
  } else if (userLogin && userLogin.files) {
    files = Object.values(userLogin.files);
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <ComboBoxDocuments
          items={files}
          label="Documents"
          selectedOption={selectOption}
          setSelectedOption={setSelectOption}
        />
      </div>
      <>
        <ShowFile
          file={file}
          nameFile={nameFile}
          selectOption={selectOption}
          setNameFile={setNameFile}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
        />
      </>
      <div>
        <SelectFile
          handleClearSelection={handleClearSelection}
          handleFileUpload={handleFileUpload}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default DocumentsEmployee;
