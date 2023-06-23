import React, { useEffect, useState } from "react";
import SearchInput from "../../ui/searchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import ListEmployee from "../../listEmployee/ListEmployee";
import {
  selectGetByVariable,
  selectGetEmployeeByUid2,
  selectGetFileURLByName,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import { EmployeesType, Files } from "@/root/types/Employee.type";
import {
  ResetByVariable,
  ResetEmployeeByUid2,
  StarGetFileURLByName,
  StartDismissEmployee,
  StartResetEmployeesByIdDepartment,
  StartResetUrl,
  StartUpDateEmployee,
} from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { toast } from "react-hot-toast";

import InputFloatLabel from "../../ui/InputFloatLabel/InputFloatLabel";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import ComboBoxDocuments from "../../employeeSection/documentsEmployee/components/comboBoxDocuments/ComboBoxDocuments";
import { saveAs } from "file-saver";
import { b64toBlob } from "@/root/utils/base64/base64";
import ListAllEmployees from "./components/listAllEmployees/ListAllEmployees";
import Swal from "sweetalert2";
import FormEditEmployee from "./components/formEditEmployee/FormEditEmployee";

export default function EditEmployeeSection() {
  const fileLoad = useSelector(selectGetFileURLByName);
  const employeeByUid2 = useSelector(selectGetEmployeeByUid2);
  const dispatch = useDispatch();

  const [clear, setClear] = useState(false);
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [clearInput, setClearInput] = useState(false);
  const [change, setChange] = useState(false);
  const [listEmployees, setListEmployees] = useState<EmployeesType[]>([]);

  const employeesListVariable = useSelector(selectGetByVariable);
  const [dataEmployee, setDataEmployee] =
    useState<EmployeesType>(initialDataEmployee);
  const [selectOption, setSelectOption] = useState<Files | null>(null);
  //TODO: This code has a nested innecesary complexity, consider split in a new hook
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dataEmployee.uid) {
      dispatch(StartUpDateEmployee(dataEmployee.uid || "", dataEmployee));
      setClear(true);
      //handleClear();
      toast.success("saved successfully");
    } else {
      toast("⚠ No employees have been loaded ");
    }
  };
  useEffect(() => {
    //TODO: improve this statement to get simplicity
    !clear && employeeByUid2 && setDataEmployee(employeeByUid2);
    clear && setDataEmployee(initialDataEmployee);
  }, [employeeByUid2, clear]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDismissEmployee = () => {
    if (employeeByUid2 && employeeByUid2.uid) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to dismiss an employee",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, dismiss",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(StartDismissEmployee(employeeByUid2.uid));
          toast.error("Fired employee");
        }
      });
      return;
    }
  };

  const handleDownload = async () => {
    dispatch(
      StarGetFileURLByName(
        employeeByUid2?.uid || "",
        selectOption?.urlFile || ""
      )
    );
    setChange(!change);
  };

  useEffect(() => {
    if (!employeesListVariable) {
      toast.error("List empty");
    }
  }, []);

  const handleClear = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!Swal.isVisible()) {
      if (dataEmployee.uid) {
        dispatch(ResetEmployeeByUid2());
        dispatch(StartResetEmployeesByIdDepartment());
        setListEmployees([]);
        dispatch(ResetByVariable());
      } else {
        setListEmployees([]);
        dispatch(ResetEmployeeByUid2());
        dispatch(StartResetEmployeesByIdDepartment());
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

        dispatch(StartResetUrl());
      } else if (selectOption.type === "image") {
        newFile = new File([blob], selectOption.name + ".png", {
          type: "image/png",
        });
        saveAs(newFile, selectOption.name);

        dispatch(StartResetUrl());
      }
    }
  }, [fileLoad, change]);

  const files: Files[] = employeeByUid2?.files
    ? Object.values(employeeByUid2.files)
    : [];

  const countEmployees = listEmployees.length;

  return (
    <>
      <h1 className="text-center font-bold text-darkBlue  text-lg">
        Employee editing section
      </h1>
      <p className="text-center font-semibold pb-5">
        search and load the information of the employee to edit
      </p>
      <div className="flex flex-wrap justify-center bg-white">
        <div className=" md:w-1/2  lg:flex-grow xl:flex-grow w-auto px-2">
          <div className="flex flex-col mb-3">
            <h2 className="font-semibold text-center">Filters</h2>
            <SearchInput
              labelInputSeekerOne="text"
              valueEnd={cedula}
              placeholderSeekerOne="Cedula"
              typeList="cedula"
              id="cedula"
            />
            <SearchInput
              labelInputSeekerOne="text"
              valueEnd={name}
              placeholderSeekerOne="Name"
              typeList="name"
              id="name"
            />
            <SearchInput
              labelInputSeekerOne="text"
              valueEnd={jobPosition}
              placeholderSeekerOne="Job Position"
              typeList="jobPosition"
              id="jobPosition"
            />
            <ListAllEmployees />
            <div className="flex justify-center text-darkBlue font-semibold">
              <p>charged employees: {countEmployees}</p>
            </div>

            <ListEmployee
              clear={clear}
              setClear={setClear}
              listEmployees={listEmployees}
              setListEmployees={setListEmployees}
            />
          </div>
        </div>
        {/* //TODO: This code has a nested unnecessary complexity, consider split in a new component */}
        <>
          <FormEditEmployee
            dataEmployee={dataEmployee}
            files={files}
            handleClear={handleClear}
            handleDismissEmployee={handleDismissEmployee}
            handleDownload={handleDownload}
            handleInputChange={handleInputChange}
            handleUpdate={handleUpdate}
            selectOption={selectOption}
            setDataEmployee={setDataEmployee}
            setSelectOption={setSelectOption}
          />
        </>
      </div>
    </>
  );
}
